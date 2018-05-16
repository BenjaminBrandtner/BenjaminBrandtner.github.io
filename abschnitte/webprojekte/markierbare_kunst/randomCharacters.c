/*Author: Benjamin Brandtner
 * 	Ersetzt ein bestimmtes Zeichen durch Random Zeichen, Symbole, Zahlen */

#include <stdio.h>
#include <time.h>
#include <stdlib.h>

int main (void)
{
	char zuErsetzen=' ';
	char ersetzenMit;

	char zeichen;

	FILE *quelle;
	FILE *ziel;
	
	srand(time(NULL));

	quelle=fopen("heart", "r");
	ziel=fopen("heart2", "w");

	while(zeichen != EOF)
	{
		/*
		 * Ascii Übersicht:
		 * Symbole: 32-47 (15)
		 * Zahlen: 48-57 (9)
		 * Buchstaben: 65-122 (57)
		 * Alles: 32-126 (94)
		 */

		ersetzenMit=rand() % 15 + 32;
		while(ersetzenMit == '<')
		{
			ersetzenMit=rand() % 94 + 32;
		}

		zeichen=fgetc(quelle);
		if(zeichen == zuErsetzen)
		{
			fputc(ersetzenMit, ziel);
		}
		else
		{
			fputc(zeichen, ziel);
		}
	}
	fclose(quelle);
	fclose(ziel);
			
			
	return 0;
}//end main
