<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
    <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
    <xsl:template match="/">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <title>XML Sitemap</title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <style type="text/css">
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
                        color: #333;
                        max-width: 75em;
                        margin: 0 auto;
                        padding: 2em;
                        line-height: 1.5;
                        background: #f5f5f5;
                    }
                    h1 {
                        color: #2c3e50;
                        font-size: 2em;
                        margin-bottom: 1em;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        background: white;
                        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
                        border-radius: 4px;
                    }
                    th {
                        background: #2c3e50;
                        color: white;
                        padding: 1em;
                        text-align: left;
                    }
                    td {
                        padding: 1em;
                        border-bottom: 1px solid #eee;
                    }
                    tr:hover {
                        background: #f9f9f9;
                    }
                    .url {
                        color: #3498db;
                        text-decoration: none;
                    }
                    .url:hover {
                        text-decoration: underline;
                    }
                    .priority {
                        text-align: center;
                    }
                    .changefreq {
                        text-align: center;
                    }
                    .lastmod {
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <h1>Lake Tahoe Property Management Sitemap</h1>
                <table>
                    <tr>
                        <th>URL</th>
                        <th>Last Modified</th>
                        <th>Change Frequency</th>
                        <th>Priority</th>
                    </tr>
                    <xsl:for-each select="sitemap:urlset/sitemap:url">
                        <tr>
                            <td>
                                <a href="{sitemap:loc}" class="url"><xsl:value-of select="sitemap:loc"/></a>
                                <xsl:if test="news:news">
                                    <br/>
                                    <small style="color: #666;">
                                        <xsl:value-of select="news:news/news:title"/>
                                        (<xsl:value-of select="news:news/news:keywords"/>)
                                    </small>
                                </xsl:if>
                            </td>
                            <td class="lastmod"><xsl:value-of select="sitemap:lastmod"/></td>
                            <td class="changefreq"><xsl:value-of select="sitemap:changefreq"/></td>
                            <td class="priority"><xsl:value-of select="sitemap:priority"/></td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet> 