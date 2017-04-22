'use strict'

const Factory = use('Factory')
const Profile = use('App/Model/Profile')

class ProfileSeeder {

  * run () {
    // run model/database factories here
    yield Profile.create({
    	id: 1,
    	title: 'Agostino Campana & Co Sagl',
    	description: 'La nostra azienda viene fondata da parte del sig. Agostino Campana nel 1958. Nella certezza di potervi offrire prodotti e manodopera di prima qualità, ad un prezzo di assoluta concorrenza, restiamo a vostra disposizione per offerte e consulenze tecniche. Visitate la nostra esposizione su appuntamento.',
    	website: 'www.agostinocampana.ch',
    	telephone: '091 941 76 81',
    	price: 120,
    	logo: '1.jpg',
    	lat: '46.020569',
    	lng: '8.970071',
    	user_id: null
    })

    yield Profile.create({
    	id: 2,
    	title: 'Garage C.L.A. SA',
    	description: 'Garage C.L.A. di Vincenzo Calà Lesina riparazioni veicoli pesanti e veicoli in genere. Produzione di tubi oleodinamici.',
    	website: 'www.agostinocampana.ch',
    	telephone: '091 946 14 89',
    	price: 87,
    	logo: '2.jpg',
    	lat: '46.091604',
    	lng: '8.922933',
    	user_id: null
    })

    yield Profile.create({
    	id: 3,
    	title: 'Lochi Car SA',
    	description: "Garage e carrozzeria con commercio di automobili nuove e usate. L'attività rappresenta la marca Hyundai.",
    	website: 'www.lochicar.ch',
    	telephone: '091 994 45 69',
    	price: 20,
    	logo: '3.jpg',
    	lat: '45.967347',
    	lng: '8.924697',
    	user_id: null
    })

    yield Profile.create({
    	id: 4,
    	title: 'F. Duttweiler AG',
    	description: 'Das heutige Familienunternehmen F. Duttweiler AG wurde 1932 egründet. Seit 2004 führt Gian- Andrea Duttweiler das Unternehmen. Zusammen mit unseren rund 45 Mitarbeitern sind wir in der Lage umfassende Dienstleistungen anzubieten.',
    	website: 'www.duttweiler-ag.ch',
    	telephone: '081 851 07 50',
    	price: 10,
    	logo: '4.jpg',
    	lat: '46.537320',
    	lng: '9.875321',
    	user_id: null
    })

    yield Profile.create({
    	id: 5,
    	title: 'Tresoldi Lattonieri SA',
    	description: "La Tresoldi lattonieri é un'azienda da anni conosciuta per i lavori eseguiti a regola d'arte.",
    	website: '	www.tresoldisa.ch',
    	telephone: '091 941 87 71',
    	price: 157,
    	logo: '5.jpg',
    	lat: '46.031668',
    	lng: '8.973651',
    	user_id: null
    })

    yield Profile.create({
    	id: 6,
    	title: 'GB SCOSSA 2000 SAGL',
    	description: "La progettazione e l'esecuzione di impianti sanitari, di riscaldamento, di ventilazione, di climatizzazione ,di isolazione e impermeabilizzazioni di ogni genere, di acquedotti, di bruciatori ad olio, di canne fumarie, di impianti ad energia alternativa, di irrigazione terreni, di aspirapolvere centralizzata, di piscine e opere da lattoniere ed edili.",
    	website: 'www.agostinocampana.ch',
    	telephone: '091 690 04 77',
    	price: 34,
    	logo: '6.jpg',
    	lat: '45.837612',
    	lng: '9.031572',
    	user_id: null
    })

    yield Profile.create({
    	id: 7,
    	title: 'Aurelio Pagnamenta SA',
    	description: '',
    	website: '	www.pagnamenta.ch',
    	telephone: '091 993 07 54',
    	price: 82,
    	logo: '',
    	lat: '45.966269',
    	lng: '8.923949',
    	user_id: null
    })

    yield Profile.create({
    	id: 8,
    	title: 'PuliEco Sagl',
    	description: '',
    	website: '',
    	telephone: '',
    	price: 74,
    	logo: '8.png',
    	lat: '46.157442',
    	lng: '8.773200',
    	user_id: null
    })

    yield Profile.create({
    	id: 9,
    	title: 'PR Pulizia e Risanamenti SA',
    	description: "La ditta PR Pulizia Risanamenti è stata fondata del 2001 ed è specializzata in diversi settori. La pulizia di canalizzazioni, l'ispezione anche con l'ausilio di rilievi televisivi ed il risanamento di canalizzazioni + sistema a spruzzo, lavori di epurazione di fosse biologiche e pozzetti raccoglitori.",
    	website: 'www.pr-ricamarte.ch',
    	telephone: '091 950 91 63',
    	price: 78,
    	logo: '9.jpg',
    	lat: '46.014447',
    	lng: '8.963594',
    	user_id: null
    })

    yield Profile.create({
    	id: 10,
    	title: 'El Mafrouhi Impresa di pulizia',
    	description: "Lo scopo dell'azienda è quello di soddisfare appieno il cliente al fine di collaborare al meglio e con la massima serenità. I servizi sono molteplici: vanno dalla pulizia di banche, uffici, appartamenti, condomini",
    	website: '',
    	telephone: '',
    	price: 99,
    	logo: '10.jpg',
    	lat: '47.376887',
    	lng: '8.541694',
    	user_id: null
    })
  }

}

module.exports = ProfileSeeder
