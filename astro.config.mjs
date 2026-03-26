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
			sidebar: [
      					// --- PRIMA CATEGORIA ---
      					{
        				label: 'Infrastrutture di Rete',
        				items: [
          						{ label: 'Subnetting e VLSM', link: '/subnetting-vlsm/' },
         						{ label: 'Le VLAN e il Tagging', link: '/vlan/' },
								{ label: 'Il routing', link: '/routing/' }
       							]
      					}, // <-- Virgola importantissima che separa le categorie!

     					// --- SECONDA CATEGORIA ---
      					{
        				label: 'Sicurezza e Protezione',
       					items: [
         						{ label: 'Le VPN', link: '/vpn/' },
          						{ label: 'IDS, IPS e DPI', link: '/ids-ips-dpi/' },
								{ label: 'Attacchi e soluzioni', link: '/attacchi-soluzioni/' },
								{ label: 'Firewall e ACL', link: '/firewall-acl/' }							
        						]
      					}, // <-- Altra virgola!

      					// --- TERZA CATEGORIA ---
      					{
        				label: 'Tecnologie Avanzate',
        				items: [
          						{ label: 'Le reti MPLS', link: '/mpls/' },
          						{ label: 'IoT e MQTT', link: '/iot-mqtt/' }
        						]
      					}, 
						// quarta categoria
						{
        				label: 'Cloud Computing e Virtualizzazione',
        				items: [
          						{ label: 'Virtualizzazione e Hypervisor', link: '/virtualizzazione-hypervisor/' },
          						{ label: 'Containerizzazione', link: '/containerizzazione/' },
								{ label: 'Modelli di servizi Cloud', link: '/cloud/' }
        						]
      					},
						{
        				label: 'Educazione Civica',
        				items: [
          						{ label: 'Confini reali e confini virtuali', link: '/civica/' }
        						]
      					}// <-- Niente virgola qui, perché è l'ultima categoria
    				],
		}),
	],
});
