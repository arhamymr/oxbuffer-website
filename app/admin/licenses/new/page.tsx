import { GenerateForm } from "../../components/generate-form";

export const metadata = {
  title: "Generate License — hexbuffer Admin",
};

export default function GenerateLicensePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Generate License</h1>
        <p className="text-sm text-muted-foreground">
          Create a new license key for a customer.
        </p>
      </div>

      <GenerateForm />
    </div>
  );
}
