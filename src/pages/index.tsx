import Form from "@/components/form";
import Alert from "@/components/alert";
import { useAlert } from "@/hooks";

export default function Home() {
  const { alert } = useAlert();
  return (
    <main className="flex items-center justify-center w-screen h-screen bg-gray-900">
      {alert ? <Alert message={alert} /> : null}
      <Form />
    </main>
  );
}
