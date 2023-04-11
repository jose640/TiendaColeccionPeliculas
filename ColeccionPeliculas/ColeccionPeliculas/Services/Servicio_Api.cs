using ColeccionPeliculas.Models;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text;

namespace ColeccionPeliculas.Services
{
    public class Servicio_Api : IServicio_Api
    {
        private static string _key;
        private static string _url;
        private static string _paramBuscar;

        public Servicio_Api()
        {
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json").Build();
            
            _key = builder.GetSection("ApiSettings:key").Value;
            _url = builder.GetSection("ApiSettings:url").Value;
        }

        public async Task<List<DatosPelicula>> Buscar(string search)
        {
            List<DatosPelicula> listaPeliculas = new List<DatosPelicula>();
            _paramBuscar = search;

            var cliente = new HttpClient();
            cliente.BaseAddress = new Uri(_url);
            var response = await cliente.GetAsync($"?apikey={_key}&s={search}");

            if(response.IsSuccessStatusCode)
            {
                var json_respuesta = await response.Content.ReadAsStringAsync();
                var resultado = JsonConvert.DeserializeObject<ResultadosBuscador>(json_respuesta);
                listaPeliculas = resultado.Search;
            }

            return listaPeliculas;
        }

        public async Task<List<DatosPelicula>> Paginacion(int page)
        {
            List<DatosPelicula> siguienteListaPeliculas = new List<DatosPelicula>();

            var cliente = new HttpClient();
            cliente.BaseAddress = new Uri(_url);
            var response = await cliente.GetAsync($"?apikey={_key}&s={_paramBuscar}&page={page}");

            if (response.IsSuccessStatusCode)
            {
                var json_respuesta = await response.Content.ReadAsStringAsync();
                var resultado = JsonConvert.DeserializeObject<ResultadosBuscador>(json_respuesta);
                siguienteListaPeliculas = resultado.Search;
            }

            return siguienteListaPeliculas;
        }

        public async Task<Pelicula> Pelicula(string id)
        {
            Pelicula pelicula = new Pelicula();

            var cliente = new HttpClient();
            cliente.BaseAddress = new Uri(_url); 
            var response = await cliente.GetAsync($"?apikey={_key}&i={id}");

            if (response.IsSuccessStatusCode)
            {
                var json_respuesta = await response.Content.ReadAsStringAsync();
                var resultado = JsonConvert.DeserializeObject<Pelicula>(json_respuesta);
                pelicula = resultado;
            }

            return pelicula;
        }
    }
}
