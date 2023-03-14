
import { MyComponent } from "ui/shared/MyComponent";
import { useStyles } from "@codegouvfr/react-dsfr/tss";
import { fr } from "@codegouvfr/react-dsfr";

export function Home() {

	const { css } = useStyles();

	return (
		<>
			<h1>Hello world Home</h1>
			<MyComponent
				text="Salut ça va?"
				className={css({
					marginTop: fr.spacing("12v"),
					marginLeft: fr.spacing("24v")
				})}
			/>
		</>
	);


}