import { Component, OnInit } from '@angular/core';
import { SteamNewsService } from '../../services/steam-news.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  steamNews: any[] = []; // Noticias obtenidas
  isLoading: boolean = true; // Muestra un spinner mientras carga

  constructor(private steamNewsService: SteamNewsService) {}

  ngOnInit() {
    this.loadSteamNews();
  }

  loadSteamNews() {
    this.steamNewsService.geSteamNews().subscribe(
      (data) => {
        if (data && data.appnews && data.appnews.newsitems) {
          this.steamNews = data.appnews.newsitems; // Guardamos las noticias
        }
        this.isLoading = false; // Detenemos el spinner
      },
      (error) => {
        console.error('Error al cargar las noticias:', error);
        this.isLoading = false; // Detenemos el spinner en caso de error
      }
    );
  }
  // Conversión de BBCode a HTML
  formatBBCode(content: string): string {
    if (!content) return '';

    const steamImageBaseURL = 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/clans';

    return content
      .replace(/\[img\]\{STEAM_CLAN_IMAGE\}(.*?)\[\/img\]/g, `<img src="${steamImageBaseURL}$1" alt="Image">`)
      .replace(/\[h1\](.*?)\[\/h1\]/g, '<h1>$1</h1>')
      .replace(/\[h2\](.*?)\[\/h2\]/g, '<h2>$1</h2>')
      .replace(/\[h3\](.*?)\[\/h3\]/g, '<h3>$1</h3>')
      .replace(/\[b\](.*?)\[\/b\]/g, '<strong>$1</strong>')
      .replace(/\[url=(.*?)\](.*?)\[\/url\]/g, '<a href="$1" target="_blank">$2</a>')
      .replace(/\[list\](.*?)\[\/list\]/gs, '<ul>$1</ul>')
      .replace(/\[\*\](.*?)$/gm, '<li>$1</li>')
      .replace(/\[\/?\w+\]/g, ''); // Eliminar etiquetas no soportadas
  }
}
