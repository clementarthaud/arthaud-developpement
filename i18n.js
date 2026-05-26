/* =========================================================================
   i18n.js — Bascule FR / EN
   Sélecteur drapeaux dans le header, persistance via localStorage.
   ========================================================================= */
(() => {
  'use strict';

  const STORAGE_KEY = 'ad-lang';
  const DEFAULT_LANG = 'fr';

  const TRANSLATIONS = {
    /* ---------- Nav / header / footer ---------- */
    'nav.home':            { fr: 'Accueil',       en: 'Home' },
    'nav.operations':      { fr: 'Opérations',    en: 'Current projects' },
    'nav.stock':           { fr: 'Stock',         en: 'Available' },
    'nav.realisations':    { fr: 'Réalisations',  en: 'Past projects' },
    'nav.contact':         { fr: 'Contact',       en: 'Contact' },
    'logo.tagline':        { fr: 'Marchand de biens',
                             en: 'Property dealer' },
    'menu.open':           { fr: 'Ouvrir le menu', en: 'Open menu' },

    'footer.intro':        { fr: 'Réhabilitation patrimoniale d\u2019immeubles d\u2019exception entre le Vieil Antibes et la Côte d\u2019Azur.',
                             en: 'Heritage restoration of exceptional buildings between Old Antibes and the French Riviera.' },
    'footer.navigate':     { fr: 'Naviguer',  en: 'Navigate' },
    'footer.contact':      { fr: 'Contact',   en: 'Contact' },
    'footer.territories':  { fr: 'Territoires', en: 'Territories' },
    'footer.tailored':     { fr: 'Demande sur-mesure', en: 'Tailored request' },
    'footer.t1':           { fr: 'Antibes — Vieil Antibes', en: 'Antibes — Old Antibes' },
    'footer.t2':           { fr: 'Nice — Côte d\u2019Azur', en: 'Nice — French Riviera' },
    'footer.copy':         { fr: '© 2026 Arthaud Développement. Tous droits réservés.',
                             en: '© 2026 Arthaud Développement. All rights reserved.' },
    'footer.legal':        { fr: 'Mentions légales · Politique de confidentialité',
                             en: 'Legal notice · Privacy policy' },

    /* ---------- Switch labels ---------- */
    'lang.fr':             { fr: 'Français', en: 'French' },
    'lang.en':             { fr: 'Anglais',  en: 'English' },

    /* ---------- Home ---------- */
    'home.title':          { fr: 'Arthaud Développement · Réhabilitation patrimoniale · Antibes & Nice',
                             en: 'Arthaud Développement · Heritage restoration · Antibes & Nice' },
    'home.hero.eyebrow':   { fr: 'Réhabilitation patrimoniale · Côte d\u2019Azur',
                             en: 'Heritage restoration · French Riviera' },
    'home.hero.h1':        { fr: 'Faire revivre la pierre méditerranéenne.',
                             en: 'Bringing Mediterranean stone back to life.' },
    'home.hero.p':         { fr: 'Nous restaurons des immeubles d\u2019exception au cœur du Vieil Antibes et de la Côte d\u2019Azur, pour en faire des lieux de vie singuliers — pensés avec soin, vendus sur mesure.',
                             en: 'We restore exceptional buildings in the heart of Old Antibes and the French Riviera, turning them into singular places to live — thoughtfully designed and sold made-to-measure.' },
    'home.hero.cta1':      { fr: 'Découvrir nos opérations', en: 'Discover our projects' },
    'home.hero.cta2':      { fr: 'Voir le stock disponible',  en: 'See available units' },
    'home.hero.scroll':    { fr: 'Défiler', en: 'Scroll' },

    'home.tiles.eyebrow':  { fr: 'Explorer', en: 'Explore' },
    'home.tiles.h2':       { fr: 'Trois manières d\u2019entrer.', en: 'Three ways in.' },
    'home.tile1.eb':       { fr: 'Opérations', en: 'Current projects' },
    'home.tile1.h3':       { fr: 'Les projets en cours', en: 'Ongoing projects' },
    'home.tile1.cta':      { fr: 'Découvrir', en: 'Discover' },
    'home.tile2.eb':       { fr: 'Stock', en: 'Available' },
    'home.tile2.h3':       { fr: 'Les biens disponibles', en: 'Available properties' },
    'home.tile2.cta':      { fr: 'Parcourir', en: 'Browse' },
    'home.tile3.eb':       { fr: 'Réalisations', en: 'Past projects' },
    'home.tile3.h3':       { fr: 'Les projets livrés', en: 'Delivered projects' },
    'home.tile3.cta':      { fr: 'Visiter', en: 'Visit' },

    'home.about.eb':       { fr: 'Notre démarche', en: 'Our approach' },
    'home.about.h2':       { fr: 'Le caractère de l\u2019ancien, repensé avec justesse.',
                             en: 'The character of the past, thoughtfully reimagined.' },
    'home.about.p1':       { fr: 'Depuis le centre ancien d\u2019Antibes et ses abords, nous redonnons vie à des immeubles et lieux de caractère à travers des restructurations complètes, pensées pour révéler tout le potentiel du bâti ancien — avec ponctuellement quelques projets menés ailleurs sur la Côte d\u2019Azur.',
                             en: 'From the historic centre of Antibes and its surroundings, we breathe new life into character buildings and places through complete restructurings designed to reveal the full potential of historic architecture — with the occasional project carried out elsewhere on the French Riviera.' },
    'home.about.p2':       { fr: 'Chaque opération fait l\u2019objet d\u2019un travail approfondi sur les volumes, la lumière et l\u2019optimisation des espaces, afin de créer des lieux plus cohérents, élégants et durables, tout en respectant l\u2019identité architecturale d\u2019origine.',
                             en: 'Each project involves in-depth work on volumes, light and the optimisation of spaces, to create places that are more coherent, elegant and lasting, while respecting the original architectural identity.' },
    'home.about.p3':       { fr: 'Nous accordons une attention particulière au choix des matériaux, aux détails patrimoniaux et aux finitions, afin de préserver le charme et l\u2019authenticité des lieux. Chaque acquéreur bénéficie enfin d\u2019un accompagnement personnalisé, permettant d\u2019adapter les espaces et les prestations pour concevoir un lieu de vie véritablement sur mesure.',
                             en: 'We pay particular attention to the choice of materials, heritage details and finishes, in order to preserve the charm and authenticity of each place. Every buyer also benefits from personalised guidance, allowing spaces and finishes to be tailored to design a truly bespoke home.' },
    'home.about.sig':      { fr: '— Restaurer, restructurer, révéler.', en: '— Restore, restructure, reveal.' },

    'home.cb.eb':          { fr: 'Un projet d\u2019acquisition', en: 'A purchase project' },
    'home.cb.h2':          { fr: 'Parlons de votre recherche.', en: 'Let\u2019s discuss your search.' },
    'home.cb.p':           { fr: 'Vous cherchez un pied-à-terre dans le Vieil Antibes, un investissement patrimonial ou un local d\u2019exception sur la Côte d\u2019Azur ? Nous prenons le temps d\u2019écouter avant de vous proposer le bien juste.',
                             en: 'Looking for a pied-à-terre in Old Antibes, a heritage investment or an exceptional commercial space on the French Riviera? We take the time to listen before suggesting the right property.' },
    'home.cb.cta':         { fr: 'Nous écrire', en: 'Write to us' },

    /* ---------- Operations page ---------- */
    'ops.title':           { fr: 'Opérations en cours · Arthaud Développement',
                             en: 'Current projects · Arthaud Développement' },
    'ops.hero.eb':         { fr: 'Opérations en cours', en: 'Current projects' },
    'ops.hero.h1':         { fr: 'Deux immeubles, deux récits méditerranéens.',
                             en: 'Two buildings, two Mediterranean stories.' },
    'ops.hero.p':          { fr: 'De la rénovation totale d\u2019un immeuble historique du Vieil Antibes à un appartement suspendu face à la mer, chaque opération est conduite avec la même exigence : faire dialoguer la pierre ancienne et l\u2019art de vivre contemporain.',
                             en: 'From the full renovation of a historic building in Old Antibes to an apartment suspended above the sea, each project is run with the same standard: a dialogue between ancient stone and contemporary living.' },
    'ops.cb.eb':           { fr: 'Étudier un investissement', en: 'Study an investment' },
    'ops.cb.h2':           { fr: 'Vous souhaitez une grille de prix détaillée ?',
                             en: 'Would you like a detailed price list?' },
    'ops.cb.p':            { fr: 'Plans, notice descriptive, calendrier de travaux, simulation fiscale : nous adressons un dossier complet à chaque demande qualifiée.',
                             en: 'Floor plans, technical specifications, works schedule, tax simulation: we send a full file with every qualified request.' },
    'ops.cb.cta':          { fr: 'Demander un dossier', en: 'Request the file' },

    /* ---------- Stock page ---------- */
    'stock.title':         { fr: 'Biens disponibles · Stock · Arthaud Développement',
                             en: 'Available properties · Arthaud Développement' },
    'stock.hero.eb':       { fr: 'Biens disponibles', en: 'Available properties' },
    'stock.hero.h1':       { fr: 'Le stock du moment.', en: 'Currently available.' },
    'stock.hero.p':        { fr: 'Tous les lots en vente, du studio aux quatre-pièces, présentés avec leurs plans, surfaces et prix. Filtrez par opération, typologie, budget ou surface — et demandez l\u2019information sur celui qui retient votre attention.',
                             en: 'All units for sale, from studios to four-room apartments, with floor plans, surfaces and prices. Filter by project, type, budget or surface — and request information on the one that catches your eye.' },
    'stock.filters.label': { fr: 'Affiner', en: 'Refine' },
    'stock.f.op.all':      { fr: 'Toutes les opérations', en: 'All projects' },
    'stock.f.type.all':    { fr: 'Toutes typologies', en: 'All types' },
    'stock.f.budget.all':  { fr: 'Tous budgets', en: 'All budgets' },
    'stock.f.budget.1':    { fr: 'Moins de 400 000 €', en: 'Under €400,000' },
    'stock.f.budget.2':    { fr: '400 000 à 700 000 €', en: '€400,000 to €700,000' },
    'stock.f.budget.3':    { fr: '700 000 € à 1 M€', en: '€700,000 to €1M' },
    'stock.f.budget.4':    { fr: 'Plus d\u20191 M€', en: 'Over €1M' },
    'stock.f.surf.all':    { fr: 'Toutes surfaces', en: 'All surfaces' },
    'stock.f.surf.1':      { fr: 'Moins de 40 m²', en: 'Under 40 m²' },
    'stock.f.surf.2':      { fr: '40 à 70 m²', en: '40 to 70 m²' },
    'stock.f.surf.3':      { fr: '70 à 100 m²', en: '70 to 100 m²' },
    'stock.f.surf.4':      { fr: 'Plus de 100 m²', en: 'Over 100 m²' },
    'stock.f.reset':       { fr: 'Réinitialiser', en: 'Reset' },
    'stock.count':         { fr: '11 biens disponibles', en: '11 available properties' },
    'stock.lot.cta':       { fr: 'Demander une information', en: 'Request information' },
    'stock.noresults':     { fr: 'Aucun bien ne correspond à vos critères pour le moment.',
                             en: 'No property matches your criteria at the moment.' },
    'stock.noresults.cta': { fr: 'Réinitialiser les filtres', en: 'Reset filters' },
    'stock.cb.eb':         { fr: 'Une recherche spécifique', en: 'A specific search' },
    'stock.cb.h2':         { fr: 'Vous ne trouvez pas le bien recherché ?', en: 'Can\u2019t find what you\u2019re looking for?' },
    'stock.cb.p':          { fr: 'Nous recevons régulièrement de nouveaux mandats et identifions des biens en off-market sur le Vieil Antibes et la Riviera. Faites-nous part de votre cahier des charges.',
                             en: 'We regularly receive new mandates and identify off-market properties in Old Antibes and on the Riviera. Tell us your requirements.' },
    'stock.cb.cta':        { fr: 'Définir ma recherche', en: 'Define my search' },

    /* ---------- Realisations page ---------- */
    'real.title':          { fr: 'Réalisations · Arthaud Développement',
                             en: 'Past projects · Arthaud Développement' },
    'real.hero.eb':        { fr: 'Réalisations livrées', en: 'Delivered projects' },
    'real.hero.h1':        { fr: 'Six opérations, une même exigence.', en: 'Six projects, one same standard.' },
    'real.hero.p':         { fr: 'Du Vieil Antibes au cœur de Nice, chaque réalisation prolonge une lecture sensible du bâti existant : restitution des volumes, choix de matériaux nobles, attention portée aux usages. Toutes ont été pré-commercialisées et façonnées avec leurs acquéreurs.',
                             en: 'From Old Antibes to the heart of Nice, each project extends a sensitive reading of the existing building: restoring volumes, choosing noble materials, paying attention to uses. All were pre-sold and shaped together with their buyers.' },
    'real.cb.eb':          { fr: 'Visiter une livraison', en: 'Visit a delivery' },
    'real.cb.h2':          { fr: 'Découvrir une réalisation sur place.', en: 'Discover a project on site.' },
    'real.cb.p':           { fr: 'Nos opérations livrées se visitent sur rendez-vous. Une manière concrète de juger de la qualité d\u2019exécution, des choix de matériaux et de l\u2019atmosphère que nous cherchons à créer.',
                             en: 'Our delivered projects can be visited by appointment. A concrete way to judge execution quality, material choices and the atmosphere we aim to create.' },
    'real.cb.cta':         { fr: 'Prendre rendez-vous', en: 'Book an appointment' },

    /* ---------- Contact page ---------- */
    'contact.title':       { fr: 'Contact · Arthaud Développement', en: 'Contact · Arthaud Développement' },
    'contact.hero.eb':     { fr: 'Contact', en: 'Contact' },
    'contact.hero.h1':     { fr: 'Échangeons sur votre projet.', en: 'Let\u2019s talk about your project.' },
    'contact.hero.p':      { fr: 'Acquisition d\u2019un bien, étude d\u2019investissement patrimonial, visite d\u2019une opération en cours : nous prenons le temps de comprendre avant de répondre. Toutes les demandes reçoivent une réponse personnalisée sous 24 h ouvrées.',
                             en: 'Acquiring a property, studying a heritage investment, visiting a current project: we take the time to understand before answering. Every request receives a personal reply within 24 working hours.' },
    'contact.info.eb':     { fr: 'Nous joindre', en: 'Reach us' },
    'contact.info.h2':     { fr: 'Une équipe à taille humaine.', en: 'A small, dedicated team.' },
    'contact.info.p':      { fr: 'Nos bureaux sont basés à Antibes, au cœur de la zone d\u2019opération. Pour toute demande, écrivez-nous : un membre de l\u2019équipe vous rappelle sous 24 h pour comprendre votre recherche.',
                             en: 'Our offices are in Antibes, at the heart of our operating area. For any request, write to us: a team member will call you back within 24 hours to understand your search.' },
    'contact.info.email':  { fr: 'Email', en: 'Email' },
    'contact.info.office': { fr: 'Bureaux', en: 'Offices' },
    'contact.info.office.v': { fr: 'Antibes — Vieil Antibes', en: 'Antibes — Old Antibes' },
    'contact.info.delay':  { fr: 'Délai de réponse', en: 'Response time' },
    'contact.info.delay.v':{ fr: 'Sous 24 h ouvrées', en: 'Within 24 working hours' },
    'contact.info.visits': { fr: 'Visites', en: 'Visits' },
    'contact.info.visits.v':{ fr: 'Sur rendez-vous', en: 'By appointment' },

    'form.firstname':      { fr: 'Prénom', en: 'First name' },
    'form.lastname':       { fr: 'Nom', en: 'Last name' },
    'form.email':          { fr: 'Email', en: 'Email' },
    'form.phone':          { fr: 'Téléphone', en: 'Phone' },
    'form.subject':        { fr: 'Objet', en: 'Subject' },
    'form.subject.0':      { fr: 'Sélectionner…', en: 'Select…' },
    'form.subject.1':      { fr: 'Un bien spécifique du stock', en: 'A specific available property' },
    'form.subject.2':      { fr: 'Information sur une opération', en: 'Information on a project' },
    'form.subject.3':      { fr: 'Recherche sur-mesure', en: 'Tailored search' },
    'form.subject.4':      { fr: 'Investissement / déficit foncier', en: 'Investment / heritage tax' },
    'form.subject.5':      { fr: 'Demande de visite', en: 'Visit request' },
    'form.subject.6':      { fr: 'Autre', en: 'Other' },
    'form.ref':            { fr: 'Référence du bien', en: 'Property reference' },
    'form.ref.ph':         { fr: 'Optionnel — ex. JDS-R2-T4', en: 'Optional — e.g. JDS-R2-T4' },
    'form.message':        { fr: 'Votre message', en: 'Your message' },
    'form.message.ph':     { fr: 'Décrivez brièvement votre recherche : typologie, budget, calendrier, usage souhaité…',
                             en: 'Briefly describe your search: type, budget, timing, intended use…' },
    'form.rgpd':           { fr: 'J\u2019accepte que mes données soient utilisées pour traiter ma demande, conformément à la',
                             en: 'I agree that my data may be used to process my request, in accordance with the' },
    'form.rgpd.link':      { fr: 'politique de confidentialité', en: 'privacy policy' },
    'form.submit':         { fr: 'Envoyer ma demande', en: 'Send my request' },
    'form.success':        { fr: 'Votre message a bien été préparé. Votre client mail va s\u2019ouvrir pour finaliser l\u2019envoi.',
                             en: 'Your message is ready. Your email client will open to complete the sending.' },

    /* ---------- Operations: Jardins de Sade ---------- */
    'op.jds.eb':           { fr: 'Opération phare · 21 lots', en: 'Flagship project · 21 units' },
    'op.jds.precomm.title':{ fr: 'Précommercialisation', en: 'Pre-sales' },
    'op.jds.precomm.count':{ fr: 'lots réservés', en: 'units reserved' },
    'op.jds.precomm.pre':  { fr: 'Plus que', en: 'Only' },
    'op.jds.precomm.post': { fr: 'disponibles', en: 'left' },
    'op.jds.h2':           { fr: 'Les Jardins de Sade', en: 'Les Jardins de Sade' },
    'op.jds.loc':          { fr: '21/23 rue Sade · Vieil Antibes', en: '21/23 rue Sade · Old Antibes' },
    'op.jds.p':            { fr: 'Sur deux immeubles mitoyens du cœur historique, Les Jardins de Sade ressuscitent un ensemble du XVIIIᵉ siècle : façades en pierre, voûtes anciennes, terrasses arborées en cœur d\u2019îlot. Vingt-et-un lots — dix-neuf appartements du T2 au T4 (de 28 à 170 m²) et deux commerces en pied d\u2019immeuble avec sous-sols — composent une partition rare, mêlant la patine de l\u2019ancien et des prestations contemporaines pensées dans la longue durée.',
                             en: 'On two adjoining buildings in the historic core, Les Jardins de Sade bring an 18th-century complex back to life: stone façades, ancient vaults, planted terraces in the heart of the block. Twenty-one units — nineteen apartments from one- to three-bedroom (28 to 170 m²) and two ground-floor retail spaces with basements — make for a rare composition, blending the patina of old stone with contemporary fittings designed to last.' },
    'op.stat.program':     { fr: 'Programme', en: 'Program' },
    'op.stat.typology':    { fr: 'Typologie', en: 'Types' },
    'op.stat.surfaces':    { fr: 'Surfaces', en: 'Surfaces' },
    'op.stat.surface':     { fr: 'Surface', en: 'Surface' },
    'op.stat.rooms':       { fr: 'Pièces', en: 'Rooms' },
    'op.stat.delivery':    { fr: 'Livraison', en: 'Delivery' },
    'op.stat.acquisition': { fr: 'Acquisition', en: 'Acquired' },
    'op.jds.lots':         { fr: '21 lots', en: '21 units' },
    'op.jds.types':        { fr: 'T2 → T4 + commerces', en: '1 → 3 bedrooms + retail' },
    'op.jds.surfaces':     { fr: '28 → 170 m²', en: '28 → 170 m²' },
    'op.jds.b1':           { fr: 'Bâtiment historique', en: 'Historic building' },
    'op.jds.b2':           { fr: 'Vente en VIR', en: 'VIR sale' },
    'op.jds.b3':           { fr: 'Sur-mesure acquéreurs', en: 'Tailored for buyers' },
    'op.jds.cta1':         { fr: 'Voir les 8 lots disponibles', en: 'See the 8 available units' },
    'op.jds.cta2':         { fr: 'Demander la grille', en: 'Request the price list' },
    'op.jds.gallery':      { fr: 'Galerie · 21/23 rue Sade', en: 'Gallery · 21/23 rue Sade' },

    /* ---------- Operations: 9 rue du Bateau ---------- */
    'op.bateau.eb':        { fr: 'En cours de travaux · Lot unique', en: 'Under renovation · Single unit' },
    'op.bateau.h2':        { fr: '9 rue du Bateau', en: '9 rue du Bateau' },
    'op.bateau.loc':       { fr: '9 rue du Bateau · Vieil Antibes — sur les remparts',
                             en: '9 rue du Bateau · Old Antibes — on the ramparts' },
    'op.bateau.p':         { fr: 'Sur les remparts d\u2019Antibes, au dernier étage et en première ligne face à la Méditerranée, un appartement rare suspendu entre ciel et mer. En cours de rénovation avec des prestations haut de gamme, ce 3/4 pièces de 66 m² loi Carrez — complété par une mezzanine — offre une atmosphère lumineuse et une vue mer imprenable depuis le séjour. Vendu entièrement meublé et équipé : un pied-à-terre d\u2019exception au cœur du Vieil Antibes.',
                             en: 'On the ramparts of Antibes, on the top floor and front-line facing the Mediterranean, a rare apartment suspended between sky and sea. Currently under high-end renovation, this 3/4-room (about 66 m² Carrez law) — with an additional mezzanine — offers a bright atmosphere and an unobstructed sea view from the living room. Sold fully furnished and equipped: an exceptional pied-à-terre in the heart of Old Antibes.' },
    'op.bateau.surf':      { fr: '66 m² + mezz.', en: '66 m² + mezz.' },
    'op.bateau.rooms':     { fr: '3/4', en: '3/4' },
    'op.bateau.delivery':  { fr: 'Juillet 2026', en: 'July 2026' },
    'op.bateau.b1':        { fr: 'Vue mer panoramique', en: 'Panoramic sea view' },
    'op.bateau.b2':        { fr: 'Meublé & équipé', en: 'Furnished & equipped' },
    'op.bateau.b3':        { fr: '1 299 000 € FAI', en: '€1,299,000 incl. fees' },
    'op.bateau.cta1':      { fr: 'Recevoir le dossier complet', en: 'Receive the full file' },
    'op.bateau.cta2':      { fr: 'Visiter sur rendez-vous', en: 'Visit by appointment' },
    'op.bateau.agency':    { fr: 'Bien proposé par l\u2019agence des Remparts.', en: 'Property offered by Agence des Remparts.' },
    'op.bateau.gallery':   { fr: 'Galerie · 9 rue du Bateau', en: 'Gallery · 9 rue du Bateau' },

    /* ---------- Realisations: 25 rue Sade — Sud ---------- */
    'r.sade25.eb':         { fr: 'Réalisation livrée · 2025', en: 'Delivered · 2025' },
    'r.sade25.h2':         { fr: '25 rue Sade — Appartement Sud', en: '25 rue Sade — South apartment' },
    'r.sade25.loc':        { fr: '25 rue Sade · Vieil Antibes — Place Nationale',
                             en: '25 rue Sade · Old Antibes — Place Nationale' },
    'r.sade25.p':          { fr: 'Au cœur de la Place Nationale, cet appartement s\u2019inscrit dans la réhabilitation soignée d\u2019un immeuble de caractère du Vieil Antibes. Le projet a été pensé dans une logique de valorisation patrimoniale, en optimisant les volumes existants tout en préservant l\u2019âme et les éléments architecturaux d\u2019origine. Les combles ont été aménagés afin de créer des espaces lumineux et chaleureux, mêlant charme de l\u2019ancien et confort contemporain. Deux T3 ont été entièrement rénovés et vendus avant même l\u2019achèvement des travaux, témoignant de l\u2019attractivité et du caractère unique de cette adresse.',
                             en: 'At the heart of Place Nationale, this apartment is part of the careful restoration of a character building in Old Antibes. The project was conceived in a heritage logic, optimising existing volumes while preserving the soul and original architectural details. The attic was converted to create bright, warm spaces blending old-world charm with contemporary comfort. Two T3 apartments were fully renovated and sold before completion of works, a testament to the appeal and uniqueness of this address.' },
    'r.sade25.s.surf':     { fr: '105 m²', en: '105 m²' },
    'r.sade25.s.prog':     { fr: '2 T3 livrés', en: '2 two-bedroom units delivered' },
    'r.sade25.s.del':      { fr: '2025', en: '2025' },
    'r.sade25.b1':         { fr: 'Place Nationale', en: 'Place Nationale' },
    'r.sade25.b2':         { fr: 'Précommercialisé', en: 'Pre-sold' },
    'r.sade25.b3':         { fr: 'Combles aménagés', en: 'Converted attic' },
    'r.sade25.gallery':    { fr: 'Galerie · 25 rue Sade — Appartement Sud', en: 'Gallery · 25 rue Sade — South apartment' },

    /* ---------- Realisations: 9 rue du Revely ---------- */
    'r.revely.eb':         { fr: 'Réalisation livrée · 2025', en: 'Delivered · 2025' },
    'r.revely.h2':         { fr: '9 rue du Revely', en: '9 rue du Revely' },
    'r.revely.loc':        { fr: 'Vieil Antibes · Près des remparts', en: 'Old Antibes · Near the ramparts' },
    'r.revely.p':          { fr: 'Au cœur du Vieil Antibes, à quelques mètres des remparts et de la Méditerranée, ce 31 m² situé au 1ᵉʳ étage a été entièrement repensé et rénové en 2025 dans un esprit élégant et intemporel. Précommercialisé au lancement des travaux, l\u2019appartement a été conçu sur mesure pour ses acquéreurs, avec une attention particulière portée aux matériaux, à la lumière et à l\u2019optimisation des volumes.',
                             en: 'In the heart of Old Antibes, just metres from the ramparts and the Mediterranean, this 31 m² apartment on the 1st floor was entirely redesigned and renovated in 2025 in an elegant, timeless spirit. Pre-sold at the start of works, the apartment was designed to measure for its buyers, with particular attention to materials, light and spatial optimisation.' },
    'r.revely.s.surf':     { fr: '31 m²', en: '31 m²' },
    'r.revely.s.prog':     { fr: '1 pied-à-terre', en: '1 pied-à-terre' },
    'r.revely.s.del':      { fr: '2025', en: '2025' },
    'r.revely.b1':         { fr: 'Confidentiel', en: 'Confidential' },
    'r.revely.b2':         { fr: 'Cocon méditerranéen', en: 'Mediterranean retreat' },
    'r.revely.b3':         { fr: 'Sur-mesure acquéreurs', en: 'Tailored for buyers' },
    'r.revely.gallery':    { fr: 'Galerie · 9 rue du Revely', en: 'Gallery · 9 rue du Revely' },

    /* ---------- Realisations: 10 avenue Félix Faure ---------- */
    'r.ff.eb':             { fr: 'Actif acquis · 2024', en: 'Asset acquired · 2024' },
    'r.ff.h2':             { fr: '10 avenue Félix Faure', en: '10 avenue Félix Faure' },
    'r.ff.loc':            { fr: 'Nice · Avenue Félix Faure', en: 'Nice · Avenue Félix Faure' },
    'r.ff.p':              { fr: 'Au cœur de Nice, entre le Vieux-Nice, la place Masséna et la coulée verte, un local commercial de caractère développant environ 540 m² sur deux niveaux. 36 mètres linéaires de vitrines en angle offrent une visibilité remarquable dans l\u2019un des emplacements les plus recherchés de la ville. Actuellement occupé par la banque CCF — un actif emblématique faisant aujourd\u2019hui l\u2019objet d\u2019une stratégie de revalorisation patrimoniale.',
                             en: 'In the heart of Nice, between Old Nice, Place Masséna and the Promenade du Paillon, a character commercial space of about 540 m² over two levels. 36 linear metres of corner shopfronts offer remarkable visibility in one of the city\u2019s most sought-after locations. Currently leased to the CCF bank — an emblematic asset now undergoing a heritage repositioning strategy.' },
    'r.ff.s.surf':         { fr: '540 m²', en: '540 m²' },
    'r.ff.s.prog':         { fr: 'Local commercial', en: 'Commercial space' },
    'r.ff.s.acq':          { fr: '2024', en: '2024' },
    'r.ff.b1':             { fr: 'Adresse premium', en: 'Premium address' },
    'r.ff.b2':             { fr: '36 ml de vitrines', en: '36 m of shopfront' },
    'r.ff.b3':             { fr: 'Revalorisation patrimoniale', en: 'Heritage repositioning' },
    'r.ff.gallery':        { fr: 'Galerie · 10 avenue Félix Faure', en: 'Gallery · 10 avenue Félix Faure' },

    /* ---------- Realisations: 14 rue Lacan ---------- */
    'r.lacan.eb':          { fr: 'Réalisation livrée · 2024', en: 'Delivered · 2024' },
    'r.lacan.h2':          { fr: '14 rue Lacan', en: '14 rue Lacan' },
    'r.lacan.loc':         { fr: 'Antibes · Centre-ville', en: 'Antibes · Town centre' },
    'r.lacan.p':           { fr: 'Ensemble mixte d\u2019environ 125 m² qui a fait l\u2019objet d\u2019une réhabilitation complète en 2024 : création d\u2019un appartement T3, pensé aussi bien pour une résidence secondaire que pour une location saisonnière haut de gamme, et d\u2019un local commercial bénéficiant d\u2019un emplacement recherché en centre-ville. Une approche mêlant optimisation des espaces, charme de l\u2019ancien et prestations contemporaines.',
                             en: 'A mixed-use ensemble of about 125 m² fully renovated in 2024: creation of a T3 apartment, designed for both a second home and high-end seasonal rental, and a commercial space in a sought-after town-centre location. An approach blending spatial optimisation, period charm and contemporary fittings.' },
    'r.lacan.s.surf':      { fr: '125 m²', en: '125 m²' },
    'r.lacan.s.prog':      { fr: '1 T3 + commerce', en: '1 two-bedroom unit + shop' },
    'r.lacan.s.del':       { fr: '2024', en: '2024' },
    'r.lacan.b1':          { fr: 'Ensemble mixte', en: 'Mixed-use' },
    'r.lacan.b2':          { fr: 'Location saisonnière', en: 'Seasonal rental' },
    'r.lacan.b3':          { fr: 'Centre-ville', en: 'Town centre' },
    'r.lacan.gallery':     { fr: 'Galerie · 14 rue Lacan', en: 'Gallery · 14 rue Lacan' },

    /* ---------- Realisations: 36 rue de la République ---------- */
    'r.rep.eb':            { fr: 'Réalisation livrée · 2024', en: 'Delivered · 2024' },
    'r.rep.h2':            { fr: '36 rue de la République', en: '36 rue de la République' },
    'r.rep.loc':           { fr: 'Antibes · Centre-ville', en: 'Antibes · Town centre' },
    'r.rep.p':             { fr: 'Restructuration complète d\u2019un ensemble d\u2019environ 180 m². Le projet a permis la création de 4 appartements, du T2 au T4, entièrement repensés dans un esprit élégant et intemporel, mettant en valeur le charme de l\u2019ancien et l\u2019architecture du bâtiment. Précommercialisés avant l\u2019achèvement des travaux, façonnés sur mesure avec leurs acquéreurs.',
                             en: 'Complete restructuring of a complex of about 180 m². The project created 4 apartments, from T2 to T4, entirely rethought in an elegant, timeless spirit, highlighting the old-world charm and the building\u2019s architecture. Pre-sold before completion of works, shaped to measure with their buyers.' },
    'r.rep.s.surf':        { fr: '180 m²', en: '180 m²' },
    'r.rep.s.prog':        { fr: '4 lots T2→T4', en: '4 units, 1→3 bedrooms' },
    'r.rep.s.del':         { fr: '2023 — 2024', en: '2023 — 2024' },
    'r.rep.b1':            { fr: 'Restructuration complète', en: 'Full restructuring' },
    'r.rep.b2':            { fr: 'Précommercialisé', en: 'Pre-sold' },
    'r.rep.b3':            { fr: 'Sur-mesure acquéreurs', en: 'Tailored for buyers' },
    'r.rep.gallery':       { fr: 'Galerie · 36 rue de la République', en: 'Gallery · 36 rue de la République' },

    /* ---------- Realisations: 14 rue du Petit Four ---------- */
    'r.pf.eb':             { fr: 'Réalisation livrée · 2022', en: 'Delivered · 2022' },
    'r.pf.h2':             { fr: '14 rue du Petit Four', en: '14 rue du Petit Four' },
    'r.pf.loc':            { fr: 'Vieil Antibes', en: 'Old Antibes' },
    'r.pf.p':              { fr: 'Au cœur du Vieil Antibes, cette ancienne maison de maître avec jardin a fait l\u2019objet d\u2019une réhabilitation complète entre 2020 et 2022. Chargée de charme et d\u2019histoire, la bâtisse a été entièrement repensée afin de créer 7 appartements mêlant cachet de l\u2019ancien et prestations contemporaines, dans une atmosphère élégante et intimiste. L\u2019immeuble bénéficie également d\u2019un agréable jardin partagé.',
                             en: 'In the heart of Old Antibes, this former townhouse with garden was fully restored between 2020 and 2022. Full of charm and history, the building was entirely rethought to create 7 apartments combining period character with contemporary fittings, in an elegant and intimate atmosphere. The building also features a pleasant shared garden.' },
    'r.pf.s.surf':         { fr: '350 m²', en: '350 m²' },
    'r.pf.s.prog':         { fr: '7 appartements', en: '7 apartments' },
    'r.pf.s.del':          { fr: '2020 — 2022', en: '2020 — 2022' },
    'r.pf.b1':             { fr: 'Maison de maître', en: 'Townhouse' },
    'r.pf.b2':             { fr: 'Jardin partagé', en: 'Shared garden' },
    'r.pf.b3':             { fr: 'Sur-mesure acquéreurs', en: 'Tailored for buyers' },
    'r.pf.gallery':        { fr: 'Galerie · 14 rue du Petit Four', en: 'Gallery · 14 rue du Petit Four' },

    /* ---------- Stock: lot details (intros) ---------- */
    'lot.25sade.intro':    { fr: 'Au cœur de la Place Nationale, ce T3 de 51 m² s\u2019inscrit dans la réhabilitation soignée d\u2019un immeuble de caractère du Vieil Antibes. Combles aménagés, vue directe sur la place, livré entièrement rénové, meublé et clé en main.',
                             en: 'In the heart of Place Nationale, this 51 m² two-bedroom apartment is part of the careful restoration of a character building in Old Antibes. Converted attic, direct view onto the square, delivered fully renovated, furnished and turnkey.' },
    'lot.bateau.intro':    { fr: 'Sur les remparts d\u2019Antibes, en première ligne face à la Méditerranée, un appartement rare suspendu entre ciel et mer. En cours de rénovation avec des prestations haut de gamme, ce T4 de 66 m² loi Carrez — complété par une mezzanine — offre une atmosphère lumineuse et une vue mer imprenable depuis le séjour. Vendu entièrement meublé et équipé.',
                             en: 'On the ramparts of Antibes, front-line facing the Mediterranean, a rare apartment suspended between sky and sea. Currently under high-end renovation, this three-bedroom apartment (about 66 m² Carrez law) — with an additional mezzanine — offers a bright atmosphere and an unobstructed sea view from the living room. Sold fully furnished and equipped.' },
    'lot.jds.r1t3.intro':  { fr: 'Au sein des Jardins de Sade, T3 traversant lumineux au 1ᵉʳ étage. Volumes anciens préservés, prestations contemporaines, finitions sur mesure définies avec l\u2019acquéreur.',
                             en: 'Within Les Jardins de Sade, a bright through-flat two-bedroom on the 1st floor. Preserved historic volumes, contemporary fittings, made-to-measure finishes defined with the buyer.' },
    'lot.jds.r1t2n.intro': { fr: 'T2 compact côté Nord au 1ᵉʳ étage des Jardins de Sade — idéal pied-à-terre ou investissement locatif au cœur du Vieil Antibes.',
                             en: 'Compact north-facing one-bedroom on the 1st floor of Les Jardins de Sade — ideal as a pied-à-terre or rental investment in the heart of Old Antibes.' },
    'lot.jds.r1t2s.intro': { fr: 'T2 compact côté Sud au 1ᵉʳ étage des Jardins de Sade — exposition lumineuse, idéal pied-à-terre ou investissement locatif au cœur du Vieil Antibes.',
                             en: 'Compact south-facing one-bedroom on the 1st floor of Les Jardins de Sade — bright exposure, ideal as a pied-à-terre or rental investment in the heart of Old Antibes.' },
    'lot.jds.r2t4.intro':  { fr: 'T4 traversant de 102 m² au 2ᵉ étage des Jardins de Sade. Belle hauteur sous plafond, double exposition, prestations sur mesure haut de gamme.',
                             en: 'Through-flat three-bedroom of 102 m² on the 2nd floor of Les Jardins de Sade. Generous ceiling height, dual exposure, made-to-measure high-end fittings.' },
    'lot.jds.r2t2n.intro': { fr: 'T2 compact côté Nord au 2ᵉ étage des Jardins de Sade — bonne luminosité, idéal pied-à-terre ou investissement locatif.',
                             en: 'Compact north-facing one-bedroom on the 2nd floor of Les Jardins de Sade — good light, ideal as a pied-à-terre or rental investment.' },
    'lot.jds.r2t2s.intro': { fr: 'T2 compact côté Sud au 2ᵉ étage des Jardins de Sade — exposition lumineuse, parfait pour un pied-à-terre ou un investissement locatif.',
                             en: 'Compact south-facing one-bedroom on the 2nd floor of Les Jardins de Sade — bright exposure, perfect as a pied-à-terre or rental investment.' },
    'lot.jds.r3t3t.intro': { fr: 'T3 traversant au 3ᵉ étage des Jardins de Sade — vues dégagées sur les toits du Vieil Antibes, double exposition, prestations sur mesure.',
                             en: 'Through-flat two-bedroom on the 3rd floor of Les Jardins de Sade — open views over the rooftops of Old Antibes, dual exposure, made-to-measure fittings.' },
    'lot.jds.r3t3n.intro': { fr: 'T3 côté Nord au 3ᵉ étage des Jardins de Sade — vues sur les toits, atmosphère paisible, conception sur mesure avec l\u2019acquéreur.',
                             en: 'North-facing two-bedroom on the 3rd floor of Les Jardins de Sade — rooftop views, peaceful atmosphere, design tailored with the buyer.' },
    'lot.jds.r3dpx.intro': { fr: 'T2 duplex avec mezzanine au 3ᵉ étage des Jardins de Sade — atmosphère cosy sous combles, conception sur mesure avec l\u2019acquéreur.',
                             en: 'One-bedroom duplex with mezzanine on the 3rd floor of Les Jardins de Sade — cosy attic atmosphere, design tailored with the buyer.' }
  };

  /* ---------- Apply translations to DOM ---------- */
  function apply(lang) {
    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const dict = TRANSLATIONS[key];
      if (!dict || !dict[lang]) return;
      el.textContent = dict[lang];
    });

    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      const dict = TRANSLATIONS[key];
      if (!dict || !dict[lang]) return;
      el.setAttribute('placeholder', dict[lang]);
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      const dict = TRANSLATIONS[key];
      if (!dict || !dict[lang]) return;
      el.setAttribute('aria-label', dict[lang]);
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const dict = TRANSLATIONS[key];
      if (!dict || !dict[lang]) return;
      if (el.tagName === 'TITLE') el.textContent = dict[lang];
      else el.setAttribute('title', dict[lang]);
    });

    // Update switcher active state
    document.querySelectorAll('.lang-switch__btn').forEach(b => {
      b.classList.toggle('is-active', b.dataset.lang === lang);
      b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false');
    });
  }

  /* ---------- Inject switcher into header ---------- */
  function injectSwitcher() {
    const nav = document.getElementById('main-nav');
    if (!nav || nav.parentElement.querySelector('.lang-switch')) return;

    const wrap = document.createElement('div');
    wrap.className = 'lang-switch';
    wrap.setAttribute('role', 'group');
    wrap.setAttribute('aria-label', 'Language / Langue');
    wrap.innerHTML = `
      <button type="button" class="lang-switch__btn" data-lang="fr" aria-pressed="true" title="Français">
        <svg viewBox="0 0 3 2" width="22" height="14" aria-hidden="true">
          <rect width="1" height="2" x="0" fill="#0055A4"/>
          <rect width="1" height="2" x="1" fill="#FFFFFF"/>
          <rect width="1" height="2" x="2" fill="#EF4135"/>
        </svg>
        <span class="sr-only">Français</span>
      </button>
      <button type="button" class="lang-switch__btn" data-lang="en" aria-pressed="false" title="English">
        <svg viewBox="0 0 60 30" width="22" height="14" aria-hidden="true">
          <clipPath id="ad-uk-clip"><rect width="60" height="30"/></clipPath>
          <g clip-path="url(#ad-uk-clip)">
            <rect width="60" height="30" fill="#012169"/>
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" stroke-width="6"/>
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" stroke-width="3"/>
            <path d="M30,0 V30 M0,15 H60" stroke="#FFFFFF" stroke-width="10"/>
            <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" stroke-width="6"/>
          </g>
        </svg>
        <span class="sr-only">English</span>
      </button>
    `;

    nav.parentElement.appendChild(wrap);

    wrap.addEventListener('click', (e) => {
      const btn = e.target.closest('.lang-switch__btn');
      if (!btn) return;
      const lang = btn.dataset.lang;
      try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) {}
      apply(lang);
    });
  }

  /* ---------- Init ---------- */
  function init() {
    injectSwitcher();
    let lang = DEFAULT_LANG;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'fr') lang = saved;
    } catch (_) {}
    apply(lang);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
