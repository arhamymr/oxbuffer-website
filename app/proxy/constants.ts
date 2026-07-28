export interface NavSection {
  id: string;
  label: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  code: string;
}

export const NAV_SECTIONS: NavSection[] = [
  { id: "overview", label: "Overview" },
  { id: "quickstart", label: "Quick Start" },
  { id: "architecture", label: "Architecture" },
  { id: "api-reference", label: "API Reference" },
  { id: "recipes", label: "Usage Recipes" },
  { id: "shutdown", label: "Graceful Shutdown" },
];

export const RECIPES: Recipe[] = [
  {
    id: "logger",
    title: "1. Request & Response Logging",
    description:
      "Inspect incoming HTTP method, URI, and outgoing response status with atomic request ID tracking.",
    code: `use std::sync::atomic::{AtomicU64, Ordering};
use async_trait::async_trait;
use http::{Request, Response};
use hexbuffer_proxy::{Body, HttpContext, HttpHandler, RequestOrResponse, Result};

pub struct Logger {
    counter: AtomicU64,
}

impl Logger {
    pub fn new() -> Self {
        Self { counter: AtomicU64::new(1) }
    }
}

#[async_trait]
impl HttpHandler for Logger {
    async fn handle_request(
        &self,
        ctx: &mut HttpContext,
        request: Request<Body>,
    ) -> Result<RequestOrResponse> {
        let id = self.counter.fetch_add(1, Ordering::Relaxed);
        ctx.id = id;
        println!("[#{id:04}] -> {} {}", request.method(), request.uri());
        Ok(RequestOrResponse::Request(request))
    }

    async fn handle_response(
        &self,
        ctx: &mut HttpContext,
        response: Response<Body>,
    ) -> Result<Response<Body>> {
        println!("[#{:04}] <- {}", ctx.id, response.status());
        Ok(response)
    }
}`,
  },
  {
    id: "headers",
    title: "2. Modifying Request Headers",
    description:
      "Inject custom user agents or strip internal tokens from requests on-the-fly.",
    code: `#[async_trait]
impl HttpHandler for HeaderModifier {
    async fn handle_request(
        &self,
        _ctx: &mut HttpContext,
        mut request: Request<Body>,
    ) -> Result<RequestOrResponse> {
        request.headers_mut().insert("User-Agent", "CustomProxy/1.0".parse().unwrap());
        request.headers_mut().remove("X-Internal-Token");
        Ok(RequestOrResponse::Request(request))
    }

    async fn handle_response(
        &self,
        _ctx: &mut HttpContext,
        response: Response<Body>,
    ) -> Result<Response<Body>> {
        Ok(response)
    }
}`,
  },
  {
    id: "short-circuit",
    title: "3. Short-Circuiting (Blocking & Mocking)",
    description:
      "Block domains or return synthetic mock HTTP responses without contacting upstream servers.",
    code: `#[async_trait]
impl HttpHandler for HostBlocker {
    async fn handle_request(
        &self,
        ctx: &mut HttpContext,
        _request: Request<Body>,
    ) -> Result<RequestOrResponse> {
        if ctx.host.contains("blocked-domain.com") {
            let res = Response::builder()
                .status(403)
                .header("Content-Type", "text/plain")
                .body(Body::Full("Blocked by Proxy".into()))
                .unwrap();
            return Ok(RequestOrResponse::Response(res));
        }
        Ok(RequestOrResponse::Request(_request))
    }

    async fn handle_response(
        &self,
        _ctx: &mut HttpContext,
        response: Response<Body>,
    ) -> Result<Response<Body>> {
        Ok(response)
    }
}`,
  },
  {
    id: "body-modify",
    title: "4. Inspecting & Modifying Response Body",
    description:
      "Collect body stream bytes and inject custom payloads into HTML responses.",
    code: `#[async_trait]
impl HttpHandler for HtmlInjector {
    async fn handle_request(
        &self,
        _ctx: &mut HttpContext,
        request: Request<Body>,
    ) -> Result<RequestOrResponse> {
        Ok(RequestOrResponse::Request(request))
    }

    async fn handle_response(
        &self,
        ctx: &mut HttpContext,
        response: Response<Body>,
    ) -> Result<Response<Body>> {
        let is_html = response.headers()
            .get("content-type")
            .and_then(|v| v.to_str().ok())
            .map(|v| v.contains("text/html"))
            .unwrap_or(false);

        if !is_html {
            return Ok(response);
        }

        let (parts, body) = response.into_parts();
        let bytes = body.into_bytes().await?;
        let mut html = String::from_utf8_lossy(&bytes).into_owned();

        html = html.replace("</body>", "<!-- Injected by hexbuffer-proxy --></body>");

        Ok(Response::from_parts(parts, Body::Full(html.into_bytes().into())))
    }
}`,
  },
  {
    id: "tls-bypass",
    title: "5. Selective TLS Interception Bypass",
    description:
      "Skip MITM certificate forging for hosts that enforce certificate pinning (e.g. Google/Apple services).",
    code: `struct BypassCertPinnedHosts;

#[async_trait]
impl HttpHandler for BypassCertPinnedHosts {
    async fn handle_request(
        &self,
        _ctx: &mut HttpContext,
        req: Request<Body>,
    ) -> Result<RequestOrResponse> {
        Ok(RequestOrResponse::Request(req))
    }

    async fn handle_response(
        &self,
        _ctx: &mut HttpContext,
        res: Response<Body>,
    ) -> Result<Response<Body>> {
        Ok(res)
    }

    async fn should_intercept_tls(&self, host: &str) -> bool {
        // Skip TLS MITM for specific domains (relays raw TCP)
        if host.ends_with("google.com") || host == "apple.com" {
            return false;
        }
        true
    }
}`,
  },
  {
    id: "dynamic-toggle",
    title: "6. Dynamic Runtime Enable / Disable Toggle",
    description:
      "Enable or disable interception at runtime via thread-safe atomic handle without restarting.",
    code: `let proxy = ProxyBuilder::new()
    .with_ca(ca)
    .with_enabled(true)
    .build()?;

let proxy_control = proxy.enabled_flag();

// In another async task or UI thread:
proxy_control.store(false, std::sync::atomic::Ordering::Relaxed); // Disables TLS interception dynamically
proxy.enable();  // Convenience method to re-enable
proxy.disable(); // Convenience method to disable`,
  },
  {
    id: "websocket",
    title: "7. WebSocket Inspection Handler",
    description:
      "Intercept, inspect, modify, or drop frame-level WebSocket traffic in duplex directions.",
    code: `use hexbuffer_proxy::{Direction, WebSocketHandler, WebSocketMessage, HttpContext, Body};
use http::Request;

struct WsLogger;

#[async_trait]
impl WebSocketHandler for WsLogger {
    async fn on_upgrade(
        &self,
        _ctx: &mut HttpContext,
        request: Request<Body>,
    ) -> Request<Body> {
        println!("WebSocket Upgrade: {}", request.uri());
        request
    }

    async fn on_frame(
        &self,
        _ctx: &mut HttpContext,
        frame: WebSocketMessage,
        direction: Direction,
    ) -> Option<WebSocketMessage> {
        match direction {
            Direction::ClientToServer => println!("WS C->S: {:?}", frame),
            Direction::ServerToClient => println!("WS S->C: {:?}", frame),
        }
        Some(frame) // Return None to drop frame
    }

    async fn on_close(&self, _ctx: &mut HttpContext) {
        println!("WebSocket Connection Closed");
    }
}`,
  },
];

export const QUICKSTART_CODE_SNIPPET = `use hexbuffer_proxy::{CertificationAuthority, ProxyBuilder};
use tokio_rustls::rustls::crypto::aws_lc_rs::default_provider;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // 1. Install rustls crypto provider (required before any TLS operations)
    let _ = default_provider().install_default();

    // 2. Initialize CA (loads from or creates cert/ca.pem and cert/ca-key.pem)
    let ca = CertificationAuthority::new();

    // 3. Build and run the proxy (defaults to 127.0.0.1:8080 and pass-through NoopHandler)
    ProxyBuilder::new()
        .with_ca(ca)
        .build()?
        .start()
        .await?;

    Ok(())
}`;

export const PROXY_BUILDER_CODE_SNIPPET = `pub fn new() -> Self
pub fn with_addr(mut self, addr: impl Into<SocketAddr>) -> Self
pub fn with_ca(mut self, ca: CertificationAuthority) -> Self
pub fn with_http_handler(mut self, handler: impl HttpHandler + 'static) -> Self
pub fn add_http_handler(mut self, handler: impl HttpHandler + 'static) -> Self
pub fn with_ws_handler(mut self, handler: impl WebSocketHandler + 'static) -> Self
pub fn with_request_buffer_size(mut self, size: usize) -> Self
pub fn with_enabled(self, enabled: bool) -> Self
pub fn enabled_flag(&self) -> Arc<AtomicBool>
pub fn with_cert_dir(mut self, dir: impl Into<PathBuf>) -> Self
pub fn build(self) -> Result<Proxy>`;

export const PROXY_CODE_SNIPPET = `pub fn is_enabled(&self) -> bool
pub fn set_enabled(&self, enabled: bool)
pub fn enable(&self)
pub fn disable(&self)
pub fn enabled_flag(&self) -> Arc<AtomicBool>
pub async fn start(self) -> Result<()>`;

export const CERTIFICATION_AUTHORITY_CODE_SNIPPET = `pub fn new() -> Self
pub fn new_in(dir: impl Into<PathBuf>) -> Self
pub fn ca_cert_pem(&self) -> &str
pub fn forge_certificate(&self, host: &str) -> (Vec<u8>, Vec<u8>)`;

export const HTTP_HANDLER_CODE_SNIPPET = `#[async_trait]
pub trait HttpHandler: Send + Sync {
    async fn handle_request(
        &self,
        ctx: &mut HttpContext,
        request: Request<Body>,
    ) -> Result<RequestOrResponse>;

    async fn handle_response(
        &self,
        ctx: &mut HttpContext,
        response: Response<Body>,
    ) -> Result<Response<Body>>;

    async fn should_intercept_tls(&self, _host: &str) -> bool {
        true
    }
}`;

export const WEBSOCKET_HANDLER_CODE_SNIPPET = `#[async_trait]
pub trait WebSocketHandler: Send + Sync {
    async fn on_upgrade(
        &self,
        _ctx: &mut HttpContext,
        request: Request<Body>,
    ) -> Request<Body> {
        request
    }

    async fn on_frame(
        &self,
        _ctx: &mut HttpContext,
        frame: WebSocketMessage,
        _direction: Direction,
    ) -> Option<WebSocketMessage> {
        Some(frame)
    }

    async fn on_close(&self, _ctx: &mut HttpContext) {}
}`;

export const PROXY_ERROR_CODE_SNIPPET = `#[derive(Error, Debug)]
pub enum ProxyError {
    #[error("I/O error: {0}")]
    Io(#[from] std::io::Error),

    #[error("TLS error: {0}")]
    Tls(#[from] tokio_rustls::rustls::Error),

    #[error("HTTP error: {0}")]
    Hyper(#[from] hyper::Error),

    #[error("invalid HTTP: {0}")]
    Http(#[from] http::Error),

    #[error("certificate error: {0}")]
    Cert(String),

    #[error("connection failed: {0}")]
    Connection(String),

    #[error("protocol error: {0}")]
    Protocol(String),
}

pub type Result<T> = std::result::Result<T, ProxyError>;`;

export const GRACEFUL_SHUTDOWN_CODE_SNIPPET = `let proxy = ProxyBuilder::new().build()?;

tokio::select! {
    res = proxy.start() => {
        if let Err(e) = res {
            eprintln!("Proxy server error: {e}");
        }
    }
    _ = tokio::signal::ctrl_c() => {
        println!("Shutting down proxy listener...");
    }
}`;
