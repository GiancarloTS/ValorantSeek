import { Component, OnInit } from '@angular/core';
import { SteamNewsService } from 'src/app/services/steam-news.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  steamNews: any[] = []; // Array para almacenar las noticias
  isLoading: boolean = true; // Spinner mientras carga

  constructor(private steamNewsService: SteamNewsService) {}

  ngOnInit() {
    this.loadSteamNews();
  }

  // Método para cargar noticias de Steam
  loadSteamNews() {
    this.steamNewsService.getSteamNews().subscribe(
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
}
