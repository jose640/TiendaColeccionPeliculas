using ColeccionPeliculas.Models;

namespace ColeccionPeliculas.Services
{
    public interface IServicio_Api
    {
        Task<List<DatosPelicula>> Buscar(string search);
        Task<Pelicula> Pelicula(string id);
        Task<List<DatosPelicula>> Paginacion(int page);
    }
}
