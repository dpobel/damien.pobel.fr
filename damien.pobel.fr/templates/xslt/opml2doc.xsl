<?xml version="1.0" encoding="UTF-8"?>
 <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
     <xsl:import href="../../node_modules/opml-utils/import/html.xsl" />
     <xsl:output method="xml" encoding="UTF-8" indent="yes" omit-xml-declaration="yes" />

     <xsl:template match="opml">
          <h1>Flux RSS pour ma veille technologique</h1>
          
          <p>
            Voici les flux RSS de ma catégorie <i>Tech</i> (export du <xsl:value-of select="$exportDate" />)
            qui me sert de source principale pour <a href="/post/comment-je-fais-ma-veille-technologique/">faire ma veille
            technologique</a>. Cette liste est aussi <a href="/files/tech.opml">disponible
            sous forme de fichier OPML</a>.
          </p>

         <xsl:apply-templates select="body/outline">
             <xsl:sort select="@title" />
         </xsl:apply-templates>
     </xsl:template>

 </xsl:stylesheet>
