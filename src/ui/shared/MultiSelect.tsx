import React, {memo} from "react";
import {assert} from "tsafe/assert";
import type {Equals} from "tsafe";
import {makeStyles} from "tss-react/dsfr";
import {declareComponentKeys} from "i18nifty";
import {fr} from "@codegouvfr/react-dsfr";
import {useTranslation} from "ui/i18n";
import {routes} from "ui/routes";
import SelectMui from "@mui/material/Select";
import {InputBase} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

type Props = {
    className?: string
    id: string
    label?: string
    options: string[]
    selectedValues: string[]
    onChange: (options: string[]) => void;
}

export const MultiSelect = (props: Props) => {

    const {className, label, id, options, selectedValues, onChange, ...rest} = props
    assert<Equals<typeof rest, {}>>()

    const {cx, classes} = useStyles();

    return (
        <div className={cx(className, classes.root)}>
            {label && <label htmlFor={`${label}-label`}>
                { label }
            </label>}
            <SelectMui
                labelId={label ? `${label}-label` : undefined}
                id={id}
                multiple
                value={selectedValues}
                onChange={event => (
                    onChange(
                        (typeof event.target.value === "string"
                        ? event.target.value.split(",")
                        : event.target.value) as string[]
                    )
                )}
                className={cx(fr.cx("fr-select"), classes.multiSelect)}
                input={<InputBase />}
            >
                {options.map(option => (
                    <MenuItem
                        key={option}
                        value={option}
                    >
                        {option}
                    </MenuItem>
                ))}
            </SelectMui>
        </div>
    )
}

const useStyles = makeStyles({name: {MultiSelect}})(theme => ({
    root: {},
    multiSelect: {
        marginTop: fr.spacing("2v"),
        paddingRight: 0,
        "&&>.MuiInputBase-input": {
            padding: 0
        },
        "&&>.MuiSvgIcon-root": {
            display: "none"
        }
    }
}));
