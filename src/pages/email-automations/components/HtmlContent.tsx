
import React, { useEffect, useState } from 'react';

const HtmlContent = ({ bodyContent, brandImageFile, productImageFile, oldBrandImageURL, oldProductImageURL, signature, signoff, headline}) => {
    const [brandImageUrl, setBrandImageUrl] = useState(null);
    const [productImageUrl, setProductImageUrl] = useState(null);
  
    headline = headline ? headline : ""
    useEffect(() => {
      if (brandImageFile) {
        const url = URL.createObjectURL(brandImageFile);
        setBrandImageUrl(url);
  
        // Clean up the Object URL when the component unmounts
        return () => URL.revokeObjectURL(url);
      }
      else if (oldBrandImageURL !== '' && oldBrandImageURL !== null && oldBrandImageURL !== undefined) {
        setBrandImageUrl(oldBrandImageURL);
      }
    }, [brandImageFile]);
  
    useEffect(() => {
      if (productImageFile) {
        const url = URL.createObjectURL(productImageFile);
        setProductImageUrl(url);
  
        // Clean up the Object URL when the component unmounts
        return () => URL.revokeObjectURL(url);
      }
      else if (oldProductImageURL !== '' && oldProductImageURL !== null && oldProductImageURL !== undefined) {
        setProductImageUrl(oldProductImageURL);
      }
    }, [productImageFile]);
  
  const formattedBodyContent = bodyContent.replace(/\n/g, '<br>');
  
  const htmlContent = 
    `<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>
    <!--[if gte mso 15]>
    <xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>*|MC:SUBJECT|*</title>
    <link rel="stylesheet" type="text/css" id="newGoogleFontsStatic" href="https://fonts.googleapis.com/css?family=DM+Sans:400,400i,700,700i,900,900i"/><style>          img{-ms-interpolation-mode:bicubic;} 
            table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;} 
            .mceStandardButton, .mceStandardButton td, .mceStandardButton td a{mso-hide:all !important;} 
            p, a, li, td, blockquote{mso-line-height-rule:exactly;} 
            p, a, li, td, body, table, blockquote{-ms-text-size-adjust:100%; -webkit-text-size-adjust:100%;} 
            @media only screen and (max-width: 480px){
                body, table, td, p, a, li, blockquote{-webkit-text-size-adjust:none !important;} 
            }
            .mcnPreviewText{display: none !important;} 
            .bodyCell{margin:0 auto; padding:0; width:100%;}
            .ExternalClass, .ExternalClass p, .ExternalClass td, .ExternalClass div, .ExternalClass span, .ExternalClass font{line-height:100%;} 
            .ReadMsgBody{width:100%;} .ExternalClass{width:100%;} 
            a[x-apple-data-detectors]{color:inherit !important; text-decoration:none !important; font-size:inherit !important; font-family:inherit !important; font-weight:inherit !important; line-height:inherit !important;} 
                body{height:100%; margin:0; padding:0; width:100%; background: #ffffff;}
                p{margin:0; padding:0;} 
                table{border-collapse:collapse;} 
                td, p, a{word-break:break-word;} 
                h1, h2, h3, h4, h5, h6{display:block; margin:0; padding:0;} 
                img, a img{border:0; height:auto; outline:none; text-decoration:none;} 
                a[href^="tel"], a[href^="sms"]{color:inherit; cursor:default; text-decoration:none;} 
                li p {margin: 0 !important;}
                .ProseMirror a {
                    pointer-events: none;
                }
                @media only screen and (max-width: 640px){
                    .mceClusterLayout td{padding: 4px !important;} 
                }
                @media only screen and (max-width: 480px){
                    body{width:100% !important; min-width:100% !important; } 
                    body.mobile-native {
                        -webkit-user-select: none; user-select: none; transition: transform 0.2s ease-in; transform-origin: top center;
                    }
                    body.mobile-native.selection-allowed a, body.mobile-native.selection-allowed .ProseMirror {
                        user-select: auto;
                        -webkit-user-select: auto;
                    }
                    colgroup{display: none;}
                    img{height: auto !important;}
                    .mceWidthContainer{max-width: 660px !important;}
                    .mceColumn{display: block !important; width: 100% !important;}
                    .mceColumn-forceSpan{display: table-cell !important; width: auto !important;}
                    .mceColumn-forceSpan .mceButton a{min-width:0 !important;}
                    .mceBlockContainer{padding-right:16px !important; padding-left:16px !important;} 
                    .mceTextBlockContainer{padding-right:16px !important; padding-left:16px !important;} 
                    .mceBlockContainerE2E{padding-right:0px; padding-left:0px;} 
                    .mceSpacing-24{padding-right:16px !important; padding-left:16px !important;}
                    .mceImage, .mceLogo{width: 100% !important; height: auto !important;} 
                    .mceFooterSection .mceText, .mceFooterSection .mceText p{font-size: 16px !important; line-height: 140% !important;}
                }
                div[contenteditable="true"] {outline: 0;}
                .ProseMirror h1.empty-node:only-child::before,
                .ProseMirror h2.empty-node:only-child::before,
                .ProseMirror h3.empty-node:only-child::before,
                .ProseMirror h4.empty-node:only-child::before {
                    content: 'Heading';
                }
                .ProseMirror p.empty-node:only-child::before, .ProseMirror:empty::before {
                    content: 'Start typing...';
                }
                .mceImageBorder {display: inline-block;}
                .mceImageBorder img {border: 0 !important;}
    body, #bodyTable { background-color: rgb(244, 244, 244); }.mceText, .mcnTextContent, .mceLabel { font-family: "DM Sans", sans-serif; }.mceText, .mcnTextContent, .mceLabel { color: rgb(0, 0, 0); }.mceText h1 { margin-bottom: 0px; }.mceText p { margin-bottom: 0px; }.mceText label { margin-bottom: 0px; }.mceText input { margin-bottom: 0px; }.mceSpacing-24 .mceInput + .mceErrorMessage { margin-top: -12px; }.mceText h1 { margin-bottom: 0px; }.mceText p { margin-bottom: 0px; }.mceText label { margin-bottom: 0px; }.mceText input { margin-bottom: 0px; }.mceSpacing-12 .mceInput + .mceErrorMessage { margin-top: -6px; }.mceInput { background-color: transparent; border: 2px solid rgb(208, 208, 208); width: 60%; color: rgb(77, 77, 77); display: block; }.mceInput[type="radio"], .mceInput[type="checkbox"] { float: left; margin-right: 12px; display: inline; width: auto !important; }.mceLabel > .mceInput { margin-bottom: 0px; margin-top: 2px; }.mceLabel { display: block; }.mceText p, .mcnTextContent p { color: rgb(0, 0, 0); font-family: "DM Sans", sans-serif; font-size: 16px; font-weight: normal; line-height: 150%; text-align: center; direction: ltr; }.mceText h1, .mcnTextContent h1 { color: rgb(0, 0, 0); font-family: "DM Sans", sans-serif; font-size: 31px; font-weight: bold; line-height: 150%; text-align: center; direction: ltr; }
    @media only screen and (max-width: 480px) {
                .mceText p { margin: 0px; font-size: 13px !important; line-height: 150% !important; }
            }
    @media only screen and (max-width: 480px) {
                .mceText h1 { font-size: 20px !important; line-height: 150% !important; }
            }
    @media only screen and (max-width: 480px) {
                .mceBlockContainer { padding-left: 25px !important; padding-right: 25px !important; }
            }
    @media only screen and (max-width: 480px) {
                .mceDividerBlock { border-top-width: 2px !important; }.mceDividerContainer { width: 100% !important; }
            }
    #dataBlockId-9 p, #dataBlockId-9 h1, #dataBlockId-9 h2, #dataBlockId-9 h3, #dataBlockId-9 h4, #dataBlockId-9 ul { text-align: center; }</style>
    <script>!function(){function o(n,i){if(n&&i)for(var r in i)i.hasOwnProperty(r)&&(void 0===n[r]?n[r]=i[r]:n[r].constructor===Object&&i[r].constructor===Object?o(n[r],i[r]):n[r]=i[r])}try{var n=decodeURIComponent("%7B%0A%22ResourceTiming%22%3A%7B%0A%22comment%22%3A%20%22Clear%20RT%20Buffer%20on%20mPulse%20beacon%22%2C%0A%22clearOnBeacon%22%3A%20true%0A%7D%2C%0A%22AutoXHR%22%3A%7B%0A%22comment%22%3A%20%22Monitor%20XHRs%20requested%20using%20FETCH%22%2C%0A%22monitorFetch%22%3A%20true%2C%0A%22comment%22%3A%20%22Start%20Monitoring%20SPAs%20from%20Click%22%2C%0A%22spaStartFromClick%22%3A%20true%0A%7D%2C%0A%22PageParams%22%3A%7B%0A%22comment%22%3A%20%22Monitor%20all%20SPA%20XHRs%22%2C%0A%22spaXhr%22%3A%20%22all%22%0A%7D%0A%7D");if(n.length>0&&window.JSON&&"function"==typeof window.JSON.parse){var i=JSON.parse(n);void 0!==window.BOOMR_config?o(window.BOOMR_config,i):window.BOOMR_config=i}}catch(r){window.console&&"function"==typeof window.console.error&&console.error("mPulse: Could not parse configuration",r)}}();</script>
                                <script>!function(a){var e="https://s.go-mpulse.net/boomerang/",t="addEventListener";if("True"=="True")a.BOOMR_config=a.BOOMR_config||{},a.BOOMR_config.PageParams=a.BOOMR_config.PageParams||{},a.BOOMR_config.PageParams.pci=!0,e="https://s2.go-mpulse.net/boomerang/";if(window.BOOMR_API_key="QAT5G-9HZLF-7EDMX-YMVCJ-QZJDA",function(){function n(e){a.BOOMR_onload=e&&e.timeStamp||(new Date).getTime()}if(!a.BOOMR||!a.BOOMR.version&&!a.BOOMR.snippetExecuted){a.BOOMR=a.BOOMR||{},a.BOOMR.snippetExecuted=!0;var i,_,o,r=document.createElement("iframe");if(a[t])a[t]("load",n,!1);else if(a.attachEvent)a.attachEvent("onload",n);r.src="javascript:void(0)",r.title="",r.role="presentation",(r.frameElement||r).style.cssText="width:0;height:0;border:0;display:none;",o=document.getElementsByTagName("script")[0],o.parentNode.insertBefore(r,o);try{_=r.contentWindow.document}catch(O){i=document.domain,r.src="javascript:var d=document.open();d.domain='"+i+"';void(0);",_=r.contentWindow.document}_.open()._l=function(){var a=this.createElement("script");if(i)this.domain=i;a.id="boomr-if-as",a.src=e+"QAT5G-9HZLF-7EDMX-YMVCJ-QZJDA",BOOMR_lstart=(new Date).getTime(),this.body.appendChild(a)},_.write("<bo"+'dy onload="document._l();">'),_.close()}}(),"400".length>0)if(a&&"performance"in a&&a.performance&&"function"==typeof a.performance.setResourceTimingBufferSize)a.performance.setResourceTimingBufferSize(400);!function(){if(BOOMR=a.BOOMR||{},BOOMR.plugins=BOOMR.plugins||{},!BOOMR.plugins.AK){var e=""=="true"?1:0,t="",n="nsjv2j3ikzojczv3mq7a-f-90faad2e3-clientnsv4-s.akamaihd.net",i="false"=="true"?2:1,_={"ak.v":"37","ak.cp":"1513051","ak.ai":parseInt("963350",10),"ak.ol":"0","ak.cr":36,"ak.ipv":4,"ak.proto":"h2","ak.rid":"3eff5607","ak.r":45795,"ak.a2":e,"ak.m":"x","ak.n":"essl","ak.bpcip":"108.147.93.0","ak.cport":62094,"ak.gh":"23.213.244.167","ak.quicv":"","ak.tlsv":"tls1.3","ak.0rtt":"","ak.csrc":"-","ak.acc":"","ak.t":"1723556926","ak.ak":"hOBiQwZUYzCg5VSAfCLimQ==gRwwOoB3oiswk/YDXdElCVNd17FZxat8/3ACEKY/QrjqBjlLUdpjmCeTvFTEG36S9qYrKdVjoQxefbsSMTGputtn8psrJl/BF0NOa6/az2AjnecKBC5a9dcTihnNls2pfUPZXPiMKwp2J6Hcvh73O5hPGIsTJiqWFIY2XKn8VwS68SpgCSqa4jI0McrBqpn5JzXXEJhEe+gijWBkT0yUbR3Y7X0fr3yRMvUCp7qZlvplPGY9cAqMqtMwt9AFPQ+jinJEBjZ7JRBMZ58zx2o6jpbM2nCFLBlHtPX2RC7HvQa6F6A/WpqvxsefLhKQ/cu9crJarV4jPSqlmWfAgmUSq3/Y472uRfeDwdkl22BaVkV8kDKPr0FeFeURkBJnMwsvQc1M93Za+GpWF2uUaVcuZg1CW62XKxFgb+lOf2YEvRs=","ak.pv":"41","ak.dpoabenc":"","ak.tf":i};if(""!==t)_["ak.ruds"]=t;var o={i:!1,av:function(e){var t="http.initiator";if(e&&(!e[t]||"spa_hard"===e[t]))_["ak.feo"]=void 0!==a.aFeoApplied?1:0,BOOMR.addVar(_)},rv:function(){var a=["ak.bpcip","ak.cport","ak.cr","ak.csrc","ak.gh","ak.ipv","ak.m","ak.n","ak.ol","ak.proto","ak.quicv","ak.tlsv","ak.0rtt","ak.r","ak.acc","ak.t","ak.tf"];BOOMR.removeVar(a)}};BOOMR.plugins.AK={akVars:_,akDNSPreFetchDomain:n,init:function(){if(!o.i){var a=BOOMR.subscribe;a("before_beacon",o.av,null,null),a("onbeacon",o.rv,null,null),o.i=!0}return this},is_complete:function(){return!0}}}}()}(window);</script></head>
    <body>
    <!--*|IF:MC_PREVIEW_TEXT|*-->
    <!--[if !gte mso 9]><!----><span class="mcnPreviewText" style="display:none; font-size:0px; line-height:0px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; visibility:hidden; mso-hide:all;">*|MC_PREVIEW_TEXT|*</span><!--<![endif]-->
    <!--*|END:IF|*-->
    <center>
    <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="background-color: rgb(244, 244, 244);">
    <tbody><tr>
    <td class="bodyCell" align="center" valign="top">
    <table id="root" border="0" cellpadding="0" cellspacing="0" width="100%"><tbody data-block-id="13" class="mceWrapper"><tr><td align="center" valign="top" class="mceWrapperOuter"><!--[if (gte mso 9)|(IE)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="660" style="width:660px;"><tr><td><![endif]--><table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:660px" role="presentation"><tbody><tr><td style="background-color:#ffffff;background-position:center;background-repeat:no-repeat;background-size:cover" class="mceWrapperInner" valign="top"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" data-block-id="12"><tbody><tr class="mceRow"><td style="background-position:center;background-repeat:no-repeat;background-size:cover" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td style="padding-top:0;padding-bottom:0" class="mceColumn" data-block-id="-7" valign="top" colspan="12" width="100%"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td style="padding-top:33px;padding-bottom:12px;padding-right:48px;padding-left:48px" class="mceBlockContainer" align="center" valign="top"><img width="248.16" height="auto" style="width:248.16px;height:auto;max-width:248.16px !important;border-radius:0;display:block" alt="" src="${brandImageUrl}" class="mceLogo"/></span></a></td></tr><tr><td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0" valign="top"><table width="100%" style="border:0;border-radius:0;border-collapse:separate"><tbody><tr><td style="padding-left:48px;padding-right:48px;padding-top:12px;padding-bottom:12px" class="mceTextBlockContainer"><div data-block-id="3" class="mceText" id="dataBlockId-3" style="width:100%"><h1 class="last-child"><span style="font-size: 22px"><span style="font-family: 'DM Sans', sans-serif">${headline}</span></span></h1></div></td></tr></tbody></table></td></tr><tr><td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0" valign="top"><table width="100%" style="border:0;border-radius:0;border-collapse:separate"><tbody><tr><td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0" valign="top"><table width="100%" style="border:0;border-radius:0;border-collapse:separate"><tbody><tr><td style="padding-left:35px;padding-right:30px;padding-top:12px;padding-bottom:12px" class="mceTextBlockContainer"><div data-block-id="19" class="mceText" id="dataBlockId-19" style="width:100%"><p style="text-align: left;" class="last-child">${formattedBodyContent}</p></div></td></tr></tbody></table></td></tr><tr><td style="padding-top:12px;padding-bottom:12px;padding-right:0;padding-left:0" class="mceBlockContainer" align="center" valign="top"><span class="mceImageBorder" style="border:0;border-radius:0;vertical-align:top;margin:0"><img data-block-id="21" width="422.4" height="auto" style="width:422.4px;height:auto;max-width:660px !important;border-radius:0;display:block" alt="" src="${productImageUrl}" role="presentation" class="imageDropZone mceImage"/></span></td></tr><tr><td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0" valign="top"><table width="100%" style="border:0;border-radius:0;border-collapse:separate"><tbody><tr><td style="padding-left:35px;padding-right:35px;padding-top:12px;padding-bottom:12px" class="mceTextBlockContainer"><div data-block-id="20" class="mceText" id="dataBlockId-20" style="width:100%"><p style="text-align: left;"><br/></p><p style="text-align: left;"><br/></p><p style="text-align: left;">${signature}</p><p style="text-align: left;">${signoff}</p><p style="text-align: left;"><br/></p><p class="last-child"><br/></p></div></td></tr></tbody></table></td></tr><tr><td style="background-color:transparent;padding-top:30px;padding-bottom:20px;padding-right:24px;padding-left:24px" class="mceBlockContainer" valign="top"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:transparent;width:100%" role="presentation" class="mceDividerContainer" data-block-id="6"><tbody><tr><td style="min-width:100%;border-top-width:2px;border-top-style:solid;border-top-color:#707070" class="mceDividerBlock" valign="top"></td></tr></tbody></table></td></tr><tr><td style="background-color:transparent;padding-top:12px;padding-bottom:12px;padding-right:0;padding-left:0" class="mceLayoutContainer" valign="top"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" data-block-id="7"><tbody><tr class="mceRow"><td style="background-color:transparent;background-position:center;background-repeat:no-repeat;background-size:cover;padding-top:0px;padding-bottom:0px" valign="top"><table border="0" cellpadding="0" cellspacing="24" width="100%" role="presentation"><tbody><tr><td class="mceColumn" data-block-id="-6" valign="top" colspan="12" width="100%"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td valign="top"><span><!--[if mso]> </tr> </table> <![endif]--></span><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" class="mceSocialFollowContainer" data-block-id="-5" style=" mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; "><tbody><tr><td align="center" valign="middle"><span>
    <!--[if mso]>
    <table align="left" border="0" cellspacing= "0" cellpadding="0"> <tr>
    <![endif]-->
    </span><span>
    <!--[if mso]>
    <td align="center" valign="top">
    <![endif]-->
    <!-- </span><table align="left" border="0" cellpadding="0" cellspacing="0" style="display:inline" role="presentation" float="left"><tbody><tr><td style="padding-top:3px;padding-bottom:3px;padding-left:12px;padding-right:12px" align="center" valign="top"><a href="https://reacherapp.com/" target="_blank" rel="noreferrer"><img class="mceSocialIcon" width="40" height="40" alt="Website icon" src="${brandImageUrl}"/></a></td></tr><tr><td style="padding-top:3px;padding-bottom:3px;padding-left:12px;padding-right:12px" align="center" valign="middle"><a style="font-weight:normal;font-style:normal;text-decoration:underline;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;color:#707070;font-size:16px" title="Website" href="https://reacherapp.com/">Website</a></td></tr></tbody></table><span> -->
    <!--[if mso]>
    </td>
    <![endif]-->
    </span><span>
    <!--[if mso]>
    <td align="center" valign="top">
    <![endif]-->
    </span><table align="left" border="0" cellpadding="0" cellspacing="0" style="display:inline" role="presentation" float="left"><tbody><tr><td style="padding-top:3px;padding-bottom:3px;padding-left:12px;padding-right:12px" align="center" valign="top"><a href="mailto:customers@reacherapp.com" target="_blank" rel="noreferrer"><img class="mceSocialIcon" width="40" height="40" alt="Email icon" src="https://cdn-images.mailchimp.com/icons/social-block-v3/block-icons-v3/email-outline-gray-40.png"/></a></td></tr><tr><td style="padding-top:3px;padding-bottom:3px;padding-left:12px;padding-right:12px" align="center" valign="middle"><a style="font-weight:normal;font-style:normal;text-decoration:underline;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;color:#707070;font-size:16px" title="Email" href="mailto:customers@reacherapp.com">Email</a></td></tr></tbody></table><span>
    <!--[if mso]>
    </td>
    <![endif]-->
    </span></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td style="padding-top:8px;padding-bottom:8px;padding-right:8px;padding-left:8px" class="mceLayoutContainer" valign="top"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" data-block-id="11" id="section_008f4fee899dec3bf8868dd9ad2d4fca" class="mceFooterSection"><tbody><tr class="mceRow"><td style="background-position:center;background-repeat:no-repeat;background-size:cover" valign="top"><table border="0" cellpadding="0" cellspacing="12" width="100%" role="presentation"><tbody><tr><td style="padding-top:0;padding-bottom:0" class="mceColumn" data-block-id="-3" valign="top" colspan="12" width="100%"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td style="padding-top:12px;padding-bottom:12px;padding-right:48px;padding-left:48px" class="mceBlockContainer" align="center" valign="top"><span class="mceImageBorder" style="border:0;border-radius:0;vertical-align:top;margin:0"><img data-block-id="8" width="129.72" height="auto" style="width:129.72px;height:auto;max-width:129.72px !important;border-radius:0;display:block" alt="" src="${brandImageUrl}" role="presentation" class="imageDropZone mceLogo"/></span></td></tr><tr><td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0" align="center" valign="top"><table width="100%" style="border:0;border-radius:0;border-collapse:separate"><tbody><tr><td style="padding-left:16px;padding-right:16px;padding-top:12px;padding-bottom:12px" class="mceTextBlockContainer"><div data-block-id="9" class="mceText" id="dataBlockId-9" style="display:inline-block;width:100%"><p class="last-child"><br/></p></div></td></tr></tbody></table></td></tr><tr><td class="mceLayoutContainer" align="center" valign="top"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" data-block-id="-2"><tbody><tr class="mceRow"><td style="background-position:center;background-repeat:no-repeat;background-size:cover;padding-top:0px;padding-bottom:0px" valign="top"><table border="0" cellpadding="0" cellspacing="24" width="100%" role="presentation"><tbody></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]--></td></tr></tbody></table>
    </td>
    </tr>
    </tbody></table>
    </center>
    <script type="text/javascript"  src="/q2c7GpRR1/qkaYnCZN/A/La7pmQLtpzJckY/NVNVOTdpKgY/YWddWA/tfbXY"></script></body></html>`;
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default HtmlContent;