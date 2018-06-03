/*Author:Benjamin Brandtner
	tic tac toe Spiel, noch keine Gewinnüberprüfung*/

#include <stdio.h>
#include <stdlib.h>

int main(void)
{
	int spielfeld[9]={0};
	int zug=1;
	int eingabe;
	int i;
	int j;
		
	system("clear");
	printf("\033[4m | | \t1|2|3\n | | \t4|5|6\n\033[0m | | \t7|8|9\n\n");

	for(i=0;i<9;i++) //Neun Runden
	{
		//Ansprache der Spieler
		if(zug%2==1)
		{
			printf("\n\033[32mSpieler 1:\033[0m ");
		}
		else
		{
			printf("\n\033[33mSpieler 2:\033[0m ");
		}
		printf("Welches Feld möchten sie markieren (1-9), Exit mit 0: ");

		//Eingabe mit Überprüfung
		do
		{
			scanf("%i", &eingabe);
			if(spielfeld[eingabe-1]!=0)
			{
				printf("Bereits angekreuzt, nochmal probieren: ");
			}
		}while(spielfeld[eingabe-1]!=0);
		
		//Beenden bei Eingabe = 0
		if(eingabe==0)
		{
			printf("\033[0m");
			return 0;
		}
		
		//Spielfeld updaten
		spielfeld[eingabe-1]=zug;

		//Zug ändern
		if(zug==1)
		{
			zug=-1;
		}
		else
		{
			zug=1;
		}

		//Spielfeld zeichnen
		system("clear");
		for(j=0;j<9;j++)
		{
			if(j<6) //Erste zwei Zeilen unterstrichen, letzte nicht
			{
				printf("\033[4m"); 
			}
			else
			{
				printf("\033[0m");
			}//end if

			if(spielfeld[j]==0) //x, o, oder leer (X=1; O=-1)
			{
				printf(" ");
			}
			else if(spielfeld[j]==1)
			{
				printf("X");
			}
			else
			{
				printf("O");
			}//end if

			if(j==2 || j==5 || j==8)//Bei Spielfeld 3, 6, 9 zeichne Vorlage und neue Zeile, ansonsten Trennstrich
			{
				printf("\t%i|%i|%i\n", j-1, j, j+1);
			}
			else
			{
				printf("|");
			}//end if
		}//Ende zeichnen

		//Gewinnüberprüfung
		/*Mögliche Gewinne:

Schrittweite 1:
		123
		456
		789
Schrittweite 3:
		147
		258
		369
Schrittweite 4:
		159
		753

		 * if(spielfeld[0]+spielfeld[1]+spielfeld[2]==3 ||
		 * 	spielfeld[3]+spielfeld[4]+spielfeld[5]==3 )
		 * {
		 * 	printf("Gewonnen Test");
		 * }
         */
	}//Ende Spiel

	return 0;
}//end main
