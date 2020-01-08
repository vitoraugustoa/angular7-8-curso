using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductsApi.Context;
using ProductsApi.Model;

namespace ProductsApi.Controllers
{
    [EnableCors("PermitirParaEstudo")]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly RequisicoesDbContext _requisicoesContext;

        public ProductController(RequisicoesDbContext requisicoesContext)
        {
            _requisicoesContext = requisicoesContext;
        }

        [HttpGet]
        public ActionResult<List<Products>> GetAll()
        {
            return Ok(_requisicoesContext.Products.ToList());
        }

        [HttpGet("error")]
        public ActionResult Error()
        {
            return BadRequest("Deu ruim!");
        }

        [HttpGet("delay")]
        public async Task<ActionResult> Delay()
        {
            await Task.Delay(2000);
            return Ok(_requisicoesContext.Products.ToList());
        }
    }
}