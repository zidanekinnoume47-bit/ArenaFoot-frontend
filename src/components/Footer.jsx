import React from 'react';
import "../styles/footer.css";

function Footer(){

return(

<footer className="footer">


<div className="footer-content">


<div className="footer-logo">

<h2>
🏆 ArenaFoot
</h2>

<p>
La plateforme de tournois eFootball
en ligne.
</p>

</div>



<div className="footer-links">

<h3>
Navigation
</h3>

<a href="/">
Accueil
</a>

<a href="/tournaments">
Tournois
</a>

<a href="/ranking">
Classement
</a>

</div>




<div className="footer-contact">

<h3>
Contact
</h3>

<p>
📧 contact@arenafut.com
</p>

<p>
📱 +229 01 90 69 29 65
</p>

</div>



<div className="footer-social">

<h3>
Suivez-nous
</h3>

<p>
Facebook
</p>

<p>
Instagram
</p>

<p>
TikTok
</p>

</div>


</div>



<div className="copyright">

© 2026 ArenaFoot - Tous droits réservés

</div>


</footer>

);

}


export default Footer;