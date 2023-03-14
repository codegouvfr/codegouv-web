import { useState } from "react";
import { makeStyles } from "@codegouvfr/react-dsfr/tss";
import { fr } from "@codegouvfr/react-dsfr";


export type Props = {
	className?: string;
	text: string;
};

export function MyComponent(props: Props) {

	const { text, className } = props;
	const [clickCount, setClickCount]= useState(0);

	const { classes, cx } = useStyles({
		isSmaller: clickCount >= 3
	});

	return (
		<div className={cx(classes.root, className)} onClick={()=> setClickCount(clickCount + 1)}>
			<span className={classes.text} >{text} {clickCount}</span>
		</div>
	);

}

const useStyles = makeStyles<{ isSmaller: boolean; }>()((theme, { isSmaller }) => ({
	root: {
		width: 300,
		height: isSmaller ? 150 : 300,
		backgroundColor: theme.decisions.background.actionHigh.redMarianne.default,
		"&:hover": {
			backgroundColor: theme.decisions.background.actionHigh.redMarianne.hover
		},
		[fr.breakpoints.down("md")]: {
			width: 100
		}
	},
	text: {
		border: "1px solid black"
	}
}));
