import React from "react";
import {assert} from "tsafe/assert";
import type {Equals} from "tsafe";
import {makeStyles} from "tss-react/dsfr";
import {fr} from "@codegouvfr/react-dsfr";
import SelectMui from "@mui/material/Select";
import {InputBase} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

type Option = {
    value: string
    label: string
    itemCount: number
}

type Props = {
    className?: string
    id: string
    label?: string
    options: Option[]
    selectedValues: string[]
    onChange: (options: string[]) => void;
}

export const MultiSelect = (props: Props) => {

    const {className, label, id, options, selectedValues, onChange, ...rest} = props
    assert<Equals<typeof rest, {}>>()

    const {cx, classes} = useStyles();

    const MenuProps = {
        className: classes.menu
    }

    //To get label from value
    const selectedLabel = (value: string) => {
        const option = options.find(option => option.value === value)
        return option?.label
    }

    return (
        <div className={cx(className, classes.root, fr.cx("fr-select-group"))}>
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
                renderValue={(selectedValues) => selectedValues.map(value => selectedLabel(value)).join(', ')}
                MenuProps={MenuProps}
            >
                {options.map(( { label, value, itemCount } ) => (
                    <MenuItem
                        key={label}
                        value={value}
                        disabled={itemCount === 0}
                    >
                        <Checkbox checked={selectedValues.indexOf(value) > -1} />
                        <ListItemText primary={label} />
                    </MenuItem>
                ))}
            </SelectMui>
        </div>
    )
}

const useStyles = makeStyles({name: {MultiSelect}})(() => ({
    root: {},
    multiSelect: {
        marginTop: fr.spacing("2v"),
        padding: 0,
        "&&>.MuiSvgIcon-root": {
            display: "none"
        },
        "div[role='button']": {
            padding: fr.spacing("2v")
        }
    },
    menu: {
        maxHeight: "20rem",
    }
}));
