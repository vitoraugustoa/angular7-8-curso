using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        [HttpGet("ids")]
        public ActionResult GetIds()
        {
            return Ok(_requisicoesContext.Products.ToList().Select(p => p.Id));
        }

        [HttpGet("NameById/{id}")]
        public ActionResult GetNameById([FromRoute] int id)
        {
            Products product = _requisicoesContext.Products.Find(id);
            if (product == null)
                return NotFound();

            return Ok(product.Name);
        }

        [HttpPost]
        public ActionResult Save([FromBody] Products product)
        {
            try
            {
                _requisicoesContext.Products.Add(product);
                _requisicoesContext.SaveChanges();
                return Ok(product);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public ActionResult Delete([FromRoute] int id)
        {
            try
            {
                Products product = _requisicoesContext.Products.Find(id);
                if (product == null)
                    return NotFound();

                _requisicoesContext.Products.Remove(product);
                _requisicoesContext.SaveChanges();
                return Ok(product);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut]
        public ActionResult Update([FromBody] Products product)
        {
            try
            {
                if (product == null)
                    return BadRequest();

                _requisicoesContext.Entry(product).State = EntityState.Modified;
                _requisicoesContext.SaveChanges();
                return Ok(product);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}