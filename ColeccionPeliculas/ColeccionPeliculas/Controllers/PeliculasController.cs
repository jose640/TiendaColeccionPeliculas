using ColeccionPeliculas.Models;
using ColeccionPeliculas.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ColeccionPeliculas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeliculasController : ControllerBase
    {
        private readonly IServicio_Api _servicioApi;

        public PeliculasController(IServicio_Api servicioApi)
        {
            _servicioApi = servicioApi;
        }

        [HttpGet]
        [Route("Lista_Default")]
        public async Task<IActionResult> Lista_Default()
        {
            string search = "2023";
            List<DatosPelicula> listado_Peliculas = await _servicioApi.Buscar(search);

            return StatusCode(StatusCodes.Status200OK, listado_Peliculas);
        }

        [HttpGet]
        [Route("Pelicula/{id}")]
        public async Task<IActionResult> Pelicula(string id)
        {
            Pelicula modelo_pelicula = new Pelicula();

            if(id != null)
            {
                modelo_pelicula = await _servicioApi.Pelicula(id);
            }

            return StatusCode(StatusCodes.Status200OK, modelo_pelicula);
        }

        [HttpGet]
        [Route("ListaPeliculas/{search}")]
        public async Task<IActionResult> ListaPeliculas(string search)
        {
            List<DatosPelicula> listado_Peliculas = new List<DatosPelicula>();

            if (search != null)
            {
                listado_Peliculas = await _servicioApi.Buscar(search);
            }
            

            return StatusCode(StatusCodes.Status200OK, listado_Peliculas);
        }

        [HttpGet]
        [Route("ListaPeliculasPaginas/{page:int}")]
        public async Task<IActionResult> ListaPeliculasPaginas(int page)
        {
            List<DatosPelicula> listado_Peliculas = new List<DatosPelicula>();

            if (page != 0)
            {
                listado_Peliculas = await _servicioApi.Paginacion(page);
            }


            return StatusCode(StatusCodes.Status200OK, listado_Peliculas);
        }
    }
}
