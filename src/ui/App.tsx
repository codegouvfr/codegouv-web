
import { Alert } from "@codegouvfr/react-dsfr/Alert";

export default function App() {
  return (
    <Alert
      closable
      description="Everything went well"
      onClose={function noRefCheck() { }}
      severity="info"
      title="Hello "
    />
  );
}

