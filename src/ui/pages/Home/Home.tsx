
import type { PageRoute } from "./route";
import { declareComponentKeys } from "i18nifty";
import { useTranslation } from "ui/i18n";
import { fr } from "@codegouvfr/react-dsfr";
import { makeStyles } from "tss-react/dsfr";
import Card from "@codegouvfr/react-dsfr/Card";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { SoftwareCard } from "./SoftwareCard";
import { SiteStats } from "ui/shared/SiteStats"
import { TileColumns } from "ui/shared/TileColumns";
import { Contribute } from "ui/shared/Contribute";
import { routes } from "ui/routes";

type Props = {
	className?: string;
	route: PageRoute;
};
export default function Home(props: Props) {
	const { route } = props

	const { t } = useTranslation({ Home });
	const { t: tCommons } = useTranslation({ App: null });
	const { cx, classes } = useStyles();

	const events = [
		{
			title: "Atelier BlueHats",
			link: {},
			imageUrl: "https://www.systeme-de-design.gouv.fr/img/placeholder.16x9.png"
		},
		{
			title: "Prise en main de react-dsfr",
			link: {},
			imageUrl: "https://www.systeme-de-design.gouv.fr/img/placeholder.16x9.png"
		}
	]

	const softwareSelection = [
		{
			logo: "https://www.systeme-de-design.gouv.fr/img/placeholder.16x9.png",
			name: "Tchap",
			description: "Description de logiciel fictive. Ce contenu est à modifier avant la mise en production",
			links: [
				{
					link:{
						href: "",
						onClick: () => {}
					},
					label: "En savoir plus"
				},
				{
					link:{
						href: "",
						onClick: () => {}
					},
					label: "Voir tout les services"
				},
			]
		},
		{
			logo: "https://www.systeme-de-design.gouv.fr/img/placeholder.16x9.png",
			name: "VLC",
			description: "Description de logiciel fictive. Ce contenu est à modifier avant la mise en production",
			links: [
				{
					link:{
						href: "",
						onClick: () => {}
					},
					label: "En savoir plus"
				},
				{
					link:{
						href: "",
						onClick: () => {}
					},
					label: "Voir tout les services"
				},
			]
		},
		{
			logo: "https://www.systeme-de-design.gouv.fr/img/placeholder.16x9.png",
			name: "Vitam",
			description: "Description de logiciel fictive. Ce contenu est à modifier avant la mise en production",
			links: [
				{
					link:{
						href: "",
						onClick: () => {}
					},
					label: "En savoir plus"
				},
				{
					link:{
						href: "",
						onClick: () => {}
					},
					label: "Voir tout les services"
				},
			]
		},
	]

	const codeGouvStats = [
		{
			label: t("numbers services"),
			number: 7
		},
		{
			label: t("numbers referenced software"),
			number: 326
		},
		{
			label: t("numbers deposit"),
			number: 15415
		}
	]

	const helpList = [
		{
			title: t("help guides"),
			linkProps:{
				href: "",
				onClick: () => {}
			},
		},
		{
			title: t("help faq"),
			linkProps:{
				href: "",
				onClick: () => {}
			},
		},
		{
			title: t("help forum"),
			linkProps:{
				href: "",
				onClick: () => {}
			},
		}
	]

	return (
		<>
			<section className={classes.lightBlueBackground}>
				<div className={cx(classes.intro, fr.cx("fr-container"))}>
					<div>
						<h2>{t("title")}</h2>
						<a className={fr.cx("fr-btn")} {...routes.about().link}>{tCommons("find out more")}</a>
					</div>
					<div className={classes.primaryEvents}>
						{
							events.map(event => <Card key={event.title} title={event.title} linkProps={event.link} imageUrl={event.imageUrl} horizontal /> )
						}
					</div>
				</div>
			</section>
			<section className={cx(classes.grid3items, fr.cx("fr-container"))}>
				{
					softwareSelection.map(software => <SoftwareCard key={software.name} softwareName={software.name} softwareDescription={software.description} logoUrl={software.logo} softwareLinks={software.links} /> )
				}
			</section>
			<section className={classes.backgroundFullWidth}>
				<SiteStats stats={codeGouvStats} title={t("codegouv numbers")}  invertedColors />
			</section>
			<section className={fr.cx("fr-container")}>
				<TileColumns tileList={helpList} title={t("help title")}/>
			</section>
			<section className={fr.cx("fr-container")}>
				<Contribute />
			</section>


			<div className={fr.cx("fr-follow")}>
				<div className={fr.cx("fr-container")}>
					<div className={cx(fr.cx("fr-grid-row"), classes.row)}>
						<div className={fr.cx("fr-col-4")}>
							<h1 className={fr.cx("fr-h5", "fr-follow__title")}>{t("newsletter BlueHats title")}</h1>
							<p className={fr.cx("fr-text--sm")}>{t("newsletter BlueHats desc")}</p>
							<a href="https://code.gouv.fr/newsletters/subscribe/bluehats@mail.etalab.studio" className={fr.cx("fr-btn")}>{tCommons("subscribe")}</a>
						</div>
						<div className={fr.cx("fr-col-4")}>
							<h1 className={fr.cx("fr-h5", "fr-follow__title")}>{t("newsletter DSI libre title")}</h1>
							<p className={fr.cx("fr-text--sm")}>{t("newsletter DSI libre desc")}</p>
							<a href="https://code.gouv.fr/newsletters/subscribe/logiciels-libres-dsi@mail.etalab.studio" className={fr.cx("fr-btn")}>{tCommons("subscribe")}</a>
						</div>
						<div className={fr.cx("fr-col-4")}>
							<div className={cx(fr.cx("fr-share", "fr-col-12"))}>
								<h1 className={fr.cx("fr-h5", "fr-follow__title")}>{t("find us")}</h1>
								<ul className={cx(fr.cx("fr-share__group"), classes.shareGroup)}>
									<li>
										<a
											className={fr.cx("fr-share__link", "fr-icon-mastodon-fill")}
											href="https://mastodon.social/@CodeGouvFr"
											title={t("title follow us on", { socialMedia: "Mastodon" })}
											aria-label={t("follow us on", { socialMedia: "Mastodon" })}
										/>
									</li>
									<li>
										<a
											className={fr.cx("fr-share__link", "fr-icon-twitter-fill")}
											href="https://twitter.com/codegouvfr"
											title={t("title follow us on", { socialMedia: "Twitter" })}
											aria-label={t("follow us on", { socialMedia: "Twitter" })}
										/>
									</li>
									<li>
										<a
											className={fr.cx("fr-share__link", "fr-icon-github-fill")}
											href="https://github.com/codegouvfr"
											rel="noreferrer noopener me"
											title={t("title follow us on", { socialMedia: "Github" })}
											aria-label={t("follow us on", { socialMedia: "Github" })}
										/>
									</li>
								</ul>
								<h1 className={fr.cx("fr-h5", "fr-follow__title")}>{t("contact us")}</h1>
								<ul className={cx(fr.cx("fr-share__group"), classes.shareGroup)}>
									<li>
										<a
											className={fr.cx("fr-share__link", "fr-icon-mail-fill")}
											href="mailto:contact@code.gouv.fr"
											title={t("contact by mail")}
										>
											contact@code.gouv.fr
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
const useStyles = makeStyles()(theme => ({
	backgroundFullWidth: {
		backgroundColor: theme.decisions.background.actionHigh.blueFrance.default
	},
	titleSection: {
		marginBottom: fr.spacing("10v"),
		[fr.breakpoints.down("md")]: {
			marginBottom: fr.spacing("8v")
		}
	},
	titleContainer: {
		marginBottom: fr.spacing("10v"),
		display: "flex"
	},
	lightBlueBackground: {
		backgroundColor: theme.decisions.background.alt.blueFrance.default
	},
	intro: {
		display: "flex",
		gap: fr.spacing("6v"),
		[fr.breakpoints.down("md")]: {
			flexDirection: "column"
		}
	},
	primaryEvents: {
		display: "flex",
		flexDirection: "column",
		gap: fr.spacing("8v")
	},
	grid3items: {
		display: "grid",
		gridTemplateColumns: "repeat(3, 1fr)",
		columnGap: fr.spacing("6v"),
		[fr.breakpoints.down("md")]: {
			gridTemplateColumns: `repeat(1, 1fr)`,
			rowGap: fr.spacing("4v")
		},
	},
	shareGroup: {
		order: "initial",
		marginBottom: fr.spacing("4v"),

		".fr-share__link": {
			marginBottom: 0
		}
	},
	row: {
		"& .fr-col-4": {
			[fr.breakpoints.down("md")]: {
				flex: "0 0 100%",
				width: "100%",
				maxWidth: "100%"
			},
		}
	}
}));


export const { i18n } = declareComponentKeys<
	{
		K: "title";
		R: JSX.Element;
	}
	| "codegouv numbers"
	| "numbers services"
	| "numbers referenced software"
	| "numbers deposit"
	| "help title"
	| "help guides"
	| "help faq"
	| "help forum"
	| "find us"
	| "contact us"
	| "contact by mail"
	| { K: "follow us on"; P: { socialMedia: string } }
	| { K: "title follow us on"; P: { socialMedia: string } }
	| "newsletter BlueHats title"
	| "newsletter BlueHats desc"
	| "newsletter DSI libre title"
	| "newsletter DSI libre desc"
>()({ Home });
