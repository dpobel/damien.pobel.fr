#! /bin/bash
# FreeRep.sh : Script permettant la récupération des messages du répondeur
# de Free par l'intermédiaire de leur site Internet.
# 
# usage: freerep.sh
#
# Licence : GNU GPL
# (c) Damien POBEL 2004
VERSION="FreeRep 0.1"

LOGIN=""	# login chez free.fr (votre numéro FT)
PASS=""		# mot de passe
TIME=1		# temps d'attente entre deux messages

BASE="http://adsl.free.fr/admin/tel/"
FORM="${BASE}index.pl"

# device
NULL="/dev/null"
AUDIO="/dev/audio"

# fichiers temporaires
TMP="/tmp/free_repondeur.htm"
LIST_MSG="/tmp/list.msg"
LIST_LEG="/tmp/list.leg"

# quelques commandes...
CURL="curl"
DL="wget"
AFFICHEUR="zenity"

echo -n "Identification"
PAGE=$($CURL -A "$VERSION" -d "login=$LOGIN" -d "pass=$PASS" "$FORM"  2> $NULL | grep  -i '<a href="notification_tel.pl?' | cut -d '"' -f 2)
if [ ! -n $PAGE ] ; then
	echo " ECHEC"
	exit 1
fi
echo " OK"

echo -n "Récupération de la liste de message"
$CURL -A "$VERSION" "${BASE}${PAGE}" -o $TMP 2> $NULL
if [ $? -ne 0 ] ; then
	echo " ECHEC"
	exit 1
fi
echo " OK"

echo -n Création de la liste des messages
cat $TMP | grep -i "<a href='ecoute_message.pl"| cut -d "'" -f 2 > $LIST_MSG
echo " OK"

echo -n Création de la liste des légendes
cat $TMP | grep -i "Nouveau message" | sed 's/<[a-zA-Z \/]*>/ /g ; s/Nouveau message//g ; s/seconde(s)//g' | tr -s ' ' > $LIST_LEG
echo " OK"
if [ $(cat $LIST_LEG | wc -l) -eq 0 ] ; then
	echo "Aucun message"
	$AFFICHEUR --error --title="Aucun message" --text="Vous n'avez aucun message"
	exit 0
fi
IFS=$'\n'
i=1
for l in $(cat $LIST_LEG) ; do
	LEG=${LEG}${i}$l
	i=$(($i+1))
done
NUM=$(echo  $LEG | xargs $AFFICHEUR --height=250 --width=350 --list --column "id" --column "Numero" --column "Heure" --column "Date" --column "Duree" --title "Choississez le(s) message(s) que vous voulez ecouter")

IFS='|'
for n in $NUM ; do
	MSG=$(cat $LIST_MSG | head -n $n | tail -1);
	echo "Ecoute du message $n"
	echo "message $n" | festival --tts
	$DL -U "$VERSION" -q "${BASE}${MSG}" -O "$AUDIO"
	sleep $TIME
done

rm -f $TMP $LIST_MSG $LIST_LEG
