import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { makeStyles } from "tss-react/dsfr";
import Tile, { TileProps } from "@codegouvfr/react-dsfr/Tile";
import { fr } from "@codegouvfr/react-dsfr";

type Props = {
    className?: string
    title?: string
    tileList: TileProps[]
}

export const TileColumns = (props: Props) => {

    const {className, title, tileList, ...rest} = props
    assert<Equals<typeof rest, {}>>()

    const {classes} = useStyles({ tileCount: tileList.length });

    return (
        <div className={className}>
            {title && <h1>{ title }</h1>}
            <div className={classes.grid}>
                { tileList.map(tile => <Tile {...tile} /> ) }
            </div>
        </div>
    )
}

const useStyles = makeStyles<{ tileCount: number }>()((theme, { tileCount }) => ({
    grid: {
        display: "grid",
        gridTemplateColumns: `repeat(${tileCount}, 1fr)`,
        columnGap: fr.spacing("6v"),
        [fr.breakpoints.down("md")]: {
            gridTemplateColumns: `repeat(1, 1fr)`,
            rowGap: fr.spacing("4v")
        },
    },
}));
