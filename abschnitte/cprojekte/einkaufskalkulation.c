/*Author:Benjamin Brandtner
	Rechnet das komplette Kalkulationsschema durch*/

#include <stdio.h>

void kompletteKalkulation (void);
float bezugsKalkulation (void);
void verkaufsKalkulation (float BP);

int main(void)
{
	int auswahl;
	int bezugspreis=0;

	printf("Was würden Sie gerne machen?\n"
	"Komplette Kalkulation (LEP -> LVP) (1)\n"
	"Bezugskalkulation (LEP -> BP) (2)\n"
	"Verkaufskalkulation (BP -> LVP) (3)\n"
	"Komplette Rückwärtskalkulation (LVP -> LEP)(4)\n"
	"Kalkulationszuschlag errechnen (BP -> LVP) (5)\n"
	"Handelsspanne errechnen (LVP -> BP)(6)\n"
	"Auswahl: ");
	scanf("%i", &auswahl);


	switch(auswahl)
	{
	case 1:
		kompletteKalkulation();
	break;
	case 2:
		bezugsKalkulation();
	break;
	case 3:
		verkaufsKalkulation(bezugspreis);
	break;
	//To-Do Restliche Cases
	}

	return 0;
}//end main

void kompletteKalkulation (void)
{
	float bezugspreis=0;
	bezugspreis=bezugsKalkulation(); //temporäre speicherung des BP um an nächste Funktion weiterzugeben
	verkaufsKalkulation(bezugspreis);
	//Ausgabe geschieht in den beiden Funktionen
}

float bezugsKalkulation (void)
{
	float LEP;
	float ZEP;
	float BEP;
	float BP;

	float lRabatt;
	float lSkonto;
	float bezugskosten;

	float lRabattWert;
	float lSkontoWert;
	
	printf("\nBitte angeben:\n");
	printf("Listeneinkauspreis: ");
	scanf("%f", &LEP);
	printf("Liefererrabatt: ");
	scanf("%f", &lRabatt);
	printf("Liefererskonto: ");
	scanf("%f", &lSkonto);
	printf("Bezugskosten: ");
	scanf("%f", &bezugskosten);

	lRabattWert=LEP*lRabatt/100;
	ZEP=LEP-lRabattWert;
	lSkontoWert=ZEP*lSkonto/100;
	BEP=ZEP-lSkontoWert;
	BP=BEP+bezugskosten;
	
	printf("\n");
	printf("  %7.2f	Listeneinkaufspreis\n", LEP);
	printf("- %7.2f	Liefererrabatt\n", lRabattWert);
	printf("= %7.2f	Zieleinkaufspreis\n", ZEP);
	printf("- %7.2f	Liefererskonto\n", lSkontoWert);
	printf("= %7.2f	Bareinkaufspreis\n", BEP);
	printf("+ %7.2f	Bezugskosten\n", bezugskosten);
	printf("= %7.2f	Bezugspreis\n", BP);

	return BP;
}

void verkaufsKalkulation (float BP)
{
	float SKP;
	float BVP;
	float ZVP;
	float LVP;

	float handlungskosten;
	float gewinn;
	float kSkonto;
	float vProvision;
	float kRabatt;

	float handlungskostenWert;
	float gewinnWert;
	float kSkontoWert;
	float vProvisionWert;
	float kRabattWert;
	
	printf("\nBitte angeben:\n");
	if(BP==0)
	{
		printf("Bezugspreis: ");
		scanf("%f", &BP);
	}
	printf("Handlungskosten: ");
	scanf("%f", &handlungskosten);
	printf("Gewinnzuschlag: ");
	scanf("%f", &gewinn);
	printf("Kundenskonto: ");
	scanf("%f", &kSkonto);
	printf("Vertreterprovision: ");
	scanf("%f", &vProvision);
	printf("Kundenrabatt: ");
	scanf("%f", &kRabatt);

	handlungskostenWert=BP*handlungskosten/100;
	SKP=BP+handlungskostenWert;

	gewinnWert=SKP*gewinn/100;
	BVP=SKP+gewinnWert;
	
	vProvisionWert=(BVP*vProvision)/(100-vProvision-kSkonto);
	kSkontoWert=(BVP*kSkonto)/(100-vProvision-kSkonto);
	ZVP=BVP+vProvisionWert+kSkontoWert;
	
	kRabattWert=ZVP*kRabatt/(100-kRabatt);
	LVP=ZVP+kRabattWert;

	printf("\n");
	printf("  %7.2f	Bezugspreis\n",BP);
	printf("+ %7.2f	Handlungskosten\n", handlungskostenWert);
	printf("= %7.2f	Selbskostenpreis\n", SKP);
	printf("+ %7.2f	Gewinn\n", gewinnWert);
	printf("= %7.2f	Barverkaufspreis\n", BVP);
	printf("+ %7.2f	Kundenskonto\n", kSkontoWert);
	printf("+ %7.2f	Vertreterprovision\n", vProvisionWert);
	printf("= %7.2f	Zielverkaufspreis\n", ZVP);
	printf("+ %7.2f	Kundenrabatt\n", kRabattWert);
	printf("= %7.2f	Listenverkaufspreis\n", LVP);
}

