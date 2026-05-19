// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://ProfPrivi.github.io',
  	base: '/sistemi_quinta', // (ricorda lo slash iniziale!)
	integrations: [
		starlight({
			title: 'Appunti di Sistemi e Reti',
			logo: {
        		src: './src/assets/greppi_net.png',
     				},
			customCss: [
        './src/styles/custom.css',
      					],
			sidebar: [
      					// --- PRIMA CATEGORIA ---
      					{
        				label: 'Infrastrutture di Rete',        				
						collapsed: true,        				
						items: [
          						{ label: 'Subnetting e VLSM', link: '/subnetting-vlsm/' },
         						{ label: 'Le VLAN e il Tagging', link: '/vlan/' },
								{ label: 'Il routing', link: '/routing/' },
								//{ label: 'Cablaggio strutturato', link: '/cab-strutt/' }
       							]
      					}, // <-- Virgola importantissima che separa le categorie!

     					// --- SECONDA CATEGORIA ---
      					{
        				label: 'Sicurezza e Protezione',        				
						collapsed: true,       					
						items: [
         						{ label: 'Le VPN', link: '/vpn/' },
								{ label: 'MFA e Zero Trust', link: '/mfa-zero/' },
          						{ label: 'IDS, IPS e DPI', link: '/ids-ips-dpi/' },
								{ label: 'Attacchi e soluzioni', link: '/attacchi-soluzioni/' },
								{ label: 'Firewall e ACL', link: '/firewall-acl/' },
								{ label: 'AAA, RADIUS e 802.1X', link: '/aaa-radius-8021x/' },
								{ label: 'Wi-Fi security', link: '/wifi-byod-8021x/' }								
        						]
      					}, // <-- Altra virgola!

      					// --- TERZA CATEGORIA ---
      					{
        				label: 'Tecnologie Avanzate',        				
						collapsed: true,        				
						items: [
          						{ label: 'Le reti MPLS', link: '/mpls/' },
								{ label: 'Le reti SD-WAN', link: '/sdwan/' },
          						{ label: 'IoT e MQTT', link: '/iot-mqtt/' },
								{ label: '5G e Satellite', link: '/5g-satellite/' }
        						]
      					}, 
						// quarta categoria
						{
        				label: 'Servizi di Rete e Livello Applicativo',
        				collapsed: true,
        				items: [
          						{ label: 'Il Protocollo DHCP', link: '/dhcp/' },
          						{ label: 'Il sistema DNS', link: '/dns/' },
								{ label: 'Protocolli Web HTTP/HTTPS', link: '/http-https/' },
								{ label: 'Active Directory e LDAP', link: '/ad-ldap/' }
        						]
      					},
						{
        				label: 'Cloud Computing e Virtualizzazione',
        				collapsed: true,
        				items: [
          						{ label: 'Virtualizzazione e Hypervisor', link: '/virtualizzazione-hypervisor/' },
          						{ label: 'Containerizzazione', link: '/containerizzazione/' },
								{ label: 'Modelli di servizi Cloud', link: '/cloud/' },
								{ label: 'Edge computing vs Cloud computing', link: '/edge-cloud/' }
        						]
      					},
						// quinta categoria
						{
        				label: 'Alta Affidabilità e Resilienza',
        				collapsed: true,
        				items: [
								{ label: 'Business continuity e Disaster Recovery', link: '/business-disaster/' }
        						]
      					},
						{
        				label: 'Sviluppo Dati e Applicazioni',
        				collapsed: true,
        				items: [
								{ label: 'Progettazione DB e Sviluppo web/API REST', link: '/info/' }
        						]
      					},
						{
        				label: 'Cablaggio Strutturato',
        				collapsed: true,
        				items: [
								{ label: 'Introduzione al Cablaggio Strutturato', link: '/cab-strutt/' }
        						]
      					},
						{
        				label: 'Seconda Prova',
        				collapsed: true,
        				items: [
								{ label: 'Struttura sviluppo traccia', link: '/sviluppo-traccia/' },
								{ label: 'Testo traccia', link: '/testo-traccia/' },
								{ label: 'Sviluppo Traccia', link: '/traccia/' },
								{ label: 'Traccia Simulazione', link: '/traccia-simul/' },
								{ label: 'Sviluppo Simulazione', link: '/sviluppo-simul/' }
        						]
      					},
						{
        				label: 'Educazione Civica',
        				collapsed: true,
        				items: [
          						{ label: 'Confini reali e confini virtuali', link: '/civica/' }
        						]
      					}// <-- Niente virgola qui, perché è l'ultima categoria
    				],
		}),
	],
});
