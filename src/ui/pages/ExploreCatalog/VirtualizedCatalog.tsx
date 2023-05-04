import { useRef, useLayoutEffect, useMemo } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { assert } from "tsafe/assert";
import { Equals } from "tsafe";
import { makeStyles } from "tss-react/dsfr";
import Explore from "ui/pages/Explore/Explore";
import { RepoCard } from "ui/pages/ExploreCatalog/RepoCard";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useWindowInnerSize } from "powerhooks/useWindowInnerSize";
import { useBreakpointsValues } from "@codegouvfr/react-dsfr/useBreakpointsValues";
import { Repository } from "core/ports/CodeGouvApi";

type Props = {
    className?: string;
    repositories: Repository[];
};

export function VirtualizedCatalog(props: Props) {

    const {className, repositories, ...rest} = props
    assert<Equals<typeof rest, {}>>()

    const { columnCount } = (function useClosure() {
        const { breakpointsValues } = useBreakpointsValues();

        const { windowInnerWidth } = useWindowInnerSize();

        const columnCount = (() => {
            if (windowInnerWidth < breakpointsValues.md) {
                return 1;
            }

            if (windowInnerWidth < breakpointsValues.xl) {
                return 2;
            }

            return 3;
        })();

        return { columnCount };
    })();

    const repositoriesGroupedByLine = useMemo(() => {
        const groupedRepositories: (Repository)[][] =
            [];

        for (let i = 0; i < repositories.length; i += columnCount) {
            const row: Repository[] = [];

            for (let j = 0; j < columnCount; j++) {
                row.push(repositories[i + j]);
            }

            groupedRepositories.push(row);
        }

        return groupedRepositories;
    }, [repositories, columnCount]);

    const parentRef = useRef<HTMLDivElement>(null);

    const parentOffsetRef = useRef(0);

    useLayoutEffect(() => {
        parentOffsetRef.current = parentRef.current?.offsetTop ?? 0;
    }, []);

    const height = 390;

    const virtualizer = useWindowVirtualizer({
        "count": repositoriesGroupedByLine.length,
        "estimateSize": () => height,
        "scrollMargin": parentOffsetRef.current,
        "overscan": 5,
    });
    const items = virtualizer.getVirtualItems();

    const { classes } = useStyles({ columnCount });

    return (
        <div ref={parentRef}>
            <div
                style={{
                    height: virtualizer.getTotalSize(),
                    position: "relative",
                    marginBottom: fr.spacing("25v")
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        transform: `translateY(${
                            items[0].start - virtualizer.options.scrollMargin
                        }px)`,
                    }}
                >
                    {items.map(virtualRow => (
                        <div
                            key={virtualRow.key}
                            data-index={virtualRow.index}
                            ref={virtualizer.measureElement}
                            className={classes.repoList}
                        >
                                {repositoriesGroupedByLine[virtualRow.index].map(
                                    (repo, i) => {
                                        if (repo === undefined) {
                                            return <div key={i}/>;
                                        }

                                        return (
                                            <RepoCard
                                                key={repo.url}
                                                repositoryName={repo.name}
                                                repositoryUrl={repo.url}
                                                devStatus={repo.status}
                                                description={repo.description}
                                                language={repo.language}
                                                lastUpdate={repo.last_updated}
                                                starCount={repo.star_count}
                                            />
                                        );
                                    }
                                )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const useStyles = makeStyles<{ columnCount: number }>({name: {Explore}})((theme, { columnCount }) => ({
    repoList: {
        display: "grid",
        gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
        gap: fr.spacing("4v"),
        paddingTop: fr.spacing("4v")
    },
}));
