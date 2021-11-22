--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4 (Ubuntu 13.4-0ubuntu0.21.04.1)
-- Dumped by pg_dump version 13.4 (Ubuntu 13.4-0ubuntu0.21.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: address; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.address (
    id integer NOT NULL,
    user_id integer NOT NULL,
    complement character varying(255) NOT NULL,
    cep character varying(255) NOT NULL,
    city_name character varying(40) NOT NULL,
    state_name character varying(20) NOT NULL
);


ALTER TABLE public.address OWNER TO postgres;

--
-- Name: address_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.address_id_seq OWNER TO postgres;

--
-- Name: address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.address_id_seq OWNED BY public.address.id;


--
-- Name: city; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.city (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.city OWNER TO postgres;

--
-- Name: city_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.city_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.city_id_seq OWNER TO postgres;

--
-- Name: city_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.city_id_seq OWNED BY public.city.id;


--
-- Name: deliveries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.deliveries (
    id integer NOT NULL,
    user_id integer NOT NULL,
    date date NOT NULL,
    delivered boolean NOT NULL
);


ALTER TABLE public.deliveries OWNER TO postgres;

--
-- Name: deliveries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.deliveries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.deliveries_id_seq OWNER TO postgres;

--
-- Name: deliveries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.deliveries_id_seq OWNED BY public.deliveries.id;


--
-- Name: delivery_plan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.delivery_plan (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.delivery_plan OWNER TO postgres;

--
-- Name: delivery_plan_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.delivery_plan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.delivery_plan_id_seq OWNER TO postgres;

--
-- Name: delivery_plan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.delivery_plan_id_seq OWNED BY public.delivery_plan.id;


--
-- Name: plan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plan (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.plan OWNER TO postgres;

--
-- Name: plan_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.plan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.plan_id_seq OWNER TO postgres;

--
-- Name: plan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.plan_id_seq OWNED BY public.plan.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    token character varying(255) NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sessions_id_seq OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: signature_products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.signature_products (
    id integer NOT NULL,
    signature_id integer NOT NULL,
    product_id integer NOT NULL
);


ALTER TABLE public.signature_products OWNER TO postgres;

--
-- Name: signature_products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.signature_products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.signature_products_id_seq OWNER TO postgres;

--
-- Name: signature_products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.signature_products_id_seq OWNED BY public.signature_products.id;


--
-- Name: signatures; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.signatures (
    id integer NOT NULL,
    user_id integer NOT NULL,
    plan_id integer NOT NULL,
    delivery_plan_id integer NOT NULL,
    signature_date date NOT NULL
);


ALTER TABLE public.signatures OWNER TO postgres;

--
-- Name: signatures_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.signatures_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.signatures_id_seq OWNER TO postgres;

--
-- Name: signatures_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.signatures_id_seq OWNED BY public.signatures.id;


--
-- Name: state; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.state (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.state OWNER TO postgres;

--
-- Name: state_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.state_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.state_id_seq OWNER TO postgres;

--
-- Name: state_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.state_id_seq OWNED BY public.state.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: address id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.address ALTER COLUMN id SET DEFAULT nextval('public.address_id_seq'::regclass);


--
-- Name: city id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.city ALTER COLUMN id SET DEFAULT nextval('public.city_id_seq'::regclass);


--
-- Name: deliveries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deliveries ALTER COLUMN id SET DEFAULT nextval('public.deliveries_id_seq'::regclass);


--
-- Name: delivery_plan id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.delivery_plan ALTER COLUMN id SET DEFAULT nextval('public.delivery_plan_id_seq'::regclass);


--
-- Name: plan id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan ALTER COLUMN id SET DEFAULT nextval('public.plan_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: signature_products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.signature_products ALTER COLUMN id SET DEFAULT nextval('public.signature_products_id_seq'::regclass);


--
-- Name: signatures id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.signatures ALTER COLUMN id SET DEFAULT nextval('public.signatures_id_seq'::regclass);


--
-- Name: state id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.state ALTER COLUMN id SET DEFAULT nextval('public.state_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: address; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.address (id, user_id, complement, cep, city_name, state_name) FROM stdin;
\.


--
-- Data for Name: city; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.city (id, name) FROM stdin;
1	sao paulo
2	3245
3	rio verde
4	gama
\.


--
-- Data for Name: deliveries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.deliveries (id, user_id, date, delivered) FROM stdin;
83	13	2021-10-12	t
99	15	2021-10-12	f
100	15	2022-12-01	f
101	15	2022-11-02	f
102	15	2022-10-03	f
103	15	2022-10-04	f
104	15	2022-10-05	f
105	15	2022-10-06	f
106	15	2022-10-07	f
107	15	2022-12-08	f
108	15	2022-11-09	f
109	15	2022-10-10	f
110	15	2022-10-11	f
7	6	2021-12-01	f
8	6	2022-03-01	f
9	6	2022-02-02	f
10	6	2022-01-03	f
11	6	2022-01-04	f
12	6	2022-01-05	f
13	6	2022-01-06	f
14	6	2022-01-07	f
15	6	2022-03-08	f
16	6	2022-02-09	f
17	6	2022-01-10	f
18	6	2022-01-11	f
19	6	2022-01-12	f
20	6	2023-02-01	f
21	6	2023-01-02	f
22	6	2023-01-03	f
23	6	2023-01-02	f
24	6	2023-01-03	f
25	6	2023-01-02	f
26	6	2023-01-03	f
27	6	2023-01-02	f
28	6	2023-01-03	f
29	6	2023-01-02	f
30	6	2023-01-03	f
31	6	2023-01-02	f
32	6	2023-01-03	f
33	6	2023-01-02	f
34	6	2023-01-03	f
35	6	2023-01-02	f
36	6	2023-01-03	f
37	6	2023-01-02	f
38	6	2023-01-03	f
39	6	2023-01-02	f
40	6	2023-01-03	f
41	6	2023-01-02	f
42	6	2023-01-03	f
44	5	2022-03-01	f
45	5	2022-10-01	f
46	5	2022-07-02	f
47	5	2022-07-03	f
111	15	2022-10-12	f
48	5	2022-10-01	f
43	5	2021-06-12	t
50	7	2022-03-01	f
51	7	2022-02-02	f
52	7	2022-01-03	f
53	7	2022-01-04	f
54	7	2022-01-05	f
55	7	2022-01-06	f
56	7	2022-01-07	f
57	7	2022-03-08	f
58	7	2022-02-09	f
59	7	2022-01-10	f
60	7	2022-01-11	f
61	7	2022-01-12	f
62	7	2023-02-01	f
63	7	2023-01-02	f
64	7	2023-01-03	f
112	15	2023-11-01	f
113	15	2023-10-02	f
114	15	2023-10-03	f
49	7	2021-01-12	t
84	13	2022-12-01	f
85	13	2022-11-02	f
86	13	2022-10-03	f
87	13	2022-10-04	f
88	13	2022-10-05	f
89	13	2022-10-06	f
90	13	2022-10-07	f
91	13	2022-12-08	f
92	13	2022-11-09	f
93	13	2022-10-10	f
94	13	2022-10-11	f
95	13	2022-10-12	f
96	13	2023-11-01	f
97	13	2023-10-02	f
98	13	2023-10-03	f
\.


--
-- Data for Name: delivery_plan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.delivery_plan (id, name) FROM stdin;
1	segunda
2	quarta
3	sexta
4	um
5	dez
6	vinte
\.


--
-- Data for Name: plan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plan (id, name) FROM stdin;
1	mensal
2	semanal
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name) FROM stdin;
1	cha
2	incenso
3	organico
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id, user_id, token) FROM stdin;
56	16	3f5691d9-8cb9-4936-b749-7042daa998ce
\.


--
-- Data for Name: signature_products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.signature_products (id, signature_id, product_id) FROM stdin;
1	2	2
2	2	2
3	3	1
4	3	3
5	4	1
6	4	3
7	5	1
8	5	3
9	6	1
10	6	3
11	7	1
12	7	3
13	8	1
14	9	1
15	10	1
16	10	2
17	10	3
\.


--
-- Data for Name: signatures; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.signatures (id, user_id, plan_id, delivery_plan_id, signature_date) FROM stdin;
2	3	1	1	2021-11-18
3	1	1	1	2021-11-18
4	4	1	3	2021-11-18
5	5	2	1	2021-11-18
6	6	1	4	2021-11-18
7	7	1	4	2021-11-18
8	13	1	5	2021-11-22
9	14	1	1	2021-11-22
10	15	1	5	2021-11-22
\.


--
-- Data for Name: state; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.state (id, name) FROM stdin;
1	AM
2	AP
3	AC
4	RO
5	RR
6	PA
7	TO
8	MA
9	CE
10	PE
11	PI
12	PB
13	SE
14	RN
15	BA
16	AL
17	GO
18	MT
19	MS
20	DF
21	SP
22	MG
23	ES
24	RJ
25	PR
26	SC
27	RS
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password) FROM stdin;
1	debs	debs@debs.com	$2b$12$wmjgg.axLczylSg8F883nOwp7OU1Pxj/zsZTyzulnR1sTptYQ53sC
2	Eileen Kuhic	Mitchell_Dooley31@yahoo.com	$2b$10$aMFz0dl8tiDYjiP2BpnSP.XUxNtwAmFvrSi6nFrkMmrwBdBaTP/Vy
3	teste	teste@teste.com	$2b$12$2v/W7GnIH2zQqOuKyXNC1ODZibwsNt7seAf5cb68mWC6IEqAqvYfS
4	12345	12345@12345.com	$2b$12$14z7JbGfEhdB.oztpf3qvuckGPTe0EwVyTGVm1NyeaYrO3tXA4lYe
5	semanal	semanal@semanal.com	$2b$12$XG7RDxXbhJ1ZfAx21unmGO/7QQzRcOzp21TYRIgRXCVuLkiSVVdZi
6	mensalum	mensalum@mensalum.com	$2b$12$Dwe38Nz90zXPsG8LAYMZPeoCvZEuWq1bDYJ6MnBDbxzYzkQFRINVe
7	aaaaa	aaaaa@aaaaa.com	$2b$12$EzZW3LAPnnTn6aCWwIvFlOOX2zXcgRpaDaZLlRoy6ery63iupDcxK
8	asd12	1231@dfsdf.com	$2b$12$tOxTEhon1QKb7W9MNXHt0OlO3UASlTYJBASmjP3Xf05JXFWKEeQt6
9	asd12	123s1@dfsdsddf.com	$2b$12$V5i9h2xOoUdJ4uEM/lZ3peF6O1Vtkb40i1NaHmjpC/F24ynpgJzZy
10	asd12	12f3s1@dfsdsddf.com	$2b$12$nSIduUk/WN3LSOC.9WnB6ewEzQaRAxsYqxUGkHy8HYvDI2i5.8skq
11	123444	12312312@dfsdfsd.com	$2b$12$PTBh1aDRo0xGSp16Zuvsiu4zEmYudEkehB0UnDAN19EIZMtdoBb62
12	amemsenhor	aleluia@aleluia.com	$2b$12$..eqEG.woIgfel4hULZGu.yZjIcEfDBh0LGQ.fyFZacIFNqLOlG/S
13	testete	rarara@rarara.com	$2b$12$V8fQ8qNH8bYET3/ygIOjbOTkhbirtIXf/rCDMJ1asO2L06CalFB1e
14	amemamem	amem@amem.com	$2b$12$IHwJI0LezljmIAqAEMxFMuQG9uV39i0K4V3ihCiSVDPxSa8I5mLJq
15	Debora	debora.caires.mor@gmail.com	$2b$12$LjXk9L5cVHWk7llxfnxK0uRPsEA1NJQNIM82rGyMX1oGZLtMqeWv2
16	asadasas	rararara@rarara.com	$2b$12$0Zawy0qYEiPpermd3aLM5.H/Ey33/5KhoqE82CPe18YBDrFS7xf/6
\.


--
-- Name: address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.address_id_seq', 7, true);


--
-- Name: city_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.city_id_seq', 4, true);


--
-- Name: deliveries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.deliveries_id_seq', 114, true);


--
-- Name: delivery_plan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.delivery_plan_id_seq', 6, true);


--
-- Name: plan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.plan_id_seq', 2, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 3, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sessions_id_seq', 56, true);


--
-- Name: signature_products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.signature_products_id_seq', 17, true);


--
-- Name: signatures_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.signatures_id_seq', 10, true);


--
-- Name: state_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.state_id_seq', 27, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 16, true);


--
-- Name: address adress_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT adress_pk PRIMARY KEY (id);


--
-- Name: city city_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.city
    ADD CONSTRAINT city_name_key UNIQUE (name);


--
-- Name: city city_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.city
    ADD CONSTRAINT city_pk PRIMARY KEY (id);


--
-- Name: deliveries deliveries_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deliveries
    ADD CONSTRAINT deliveries_pk PRIMARY KEY (id);


--
-- Name: delivery_plan delivery_plan_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.delivery_plan
    ADD CONSTRAINT delivery_plan_name_key UNIQUE (name);


--
-- Name: delivery_plan delivery_plan_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.delivery_plan
    ADD CONSTRAINT delivery_plan_pk PRIMARY KEY (id);


--
-- Name: plan plan_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan
    ADD CONSTRAINT plan_name_key UNIQUE (name);


--
-- Name: plan plan_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan
    ADD CONSTRAINT plan_pk PRIMARY KEY (id);


--
-- Name: products products_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_name_key UNIQUE (name);


--
-- Name: products products_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pk PRIMARY KEY (id);


--
-- Name: sessions sessions_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pk PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: signature_products signature_products_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.signature_products
    ADD CONSTRAINT signature_products_pk PRIMARY KEY (id);


--
-- Name: signatures signatures_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.signatures
    ADD CONSTRAINT signatures_pk PRIMARY KEY (id);


--
-- Name: state state_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.state
    ADD CONSTRAINT state_name_key UNIQUE (name);


--
-- Name: state state_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.state
    ADD CONSTRAINT state_pk PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

