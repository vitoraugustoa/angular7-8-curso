using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductDepartmentCrudApi.Data;
using ProductDepartmentCrudApi.Model;

namespace ProductDepartmentCrudApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductData _productData;

        public ProductController(IProductData productData)
        {
            _productData = productData;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                //return Ok(_productData.GetAll());
                return Ok(_productData.GetAllLazyLoading());

            }
            catch (Exception ex)
            {
                return Problem(ex.Message, nameof(GetAll), StatusCodes.Status500InternalServerError, "Fail listing the products.");
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            try
            {
                return Ok(_productData.GetById(id));
            }
            catch (Exception ex)
            {
                return Problem(ex.Message, nameof(GetById), StatusCodes.Status500InternalServerError, "Fail getting the products.");
            }
        }

        [HttpPost]
        public IActionResult Add([FromBody] Product product)
        {
            try
            {
                return Ok(_productData.Add(product));
            }
            catch (Exception ex)
            {
                return Problem(ex.Message, nameof(Add), StatusCodes.Status500InternalServerError, "Fail adding the product.");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Remove([FromRoute] int id)
        {
            try
            {
                return Ok(_productData.Remove(id));
            }
            catch (Exception ex)
            {
                return Problem(ex.Message, nameof(Remove), StatusCodes.Status500InternalServerError, "Fail removing the product.");
            }
        }

        [HttpPut]
        public IActionResult Update([FromBody] Product product)
        {
            try
            {
                return Ok(_productData.Update(product));
            }
            catch (Exception ex)
            {
                return Problem(ex.Message, nameof(Update), StatusCodes.Status500InternalServerError, "Fail updating the product.");
            }
        }

        [HttpPost("AddDepartment")]
        public IActionResult AddDepartmentToProduct([FromBody] ProductDepartment productDeparment)
        {
            try
            {
                _productData.AddDepartmentInProduct(productDeparment);
                return Ok();
            }
            catch (Exception ex)
            {
                return Problem(ex.Message, nameof(AddDepartmentToProduct), StatusCodes.Status500InternalServerError, "Fail adding the department in product.");
            }
        }

        [HttpDelete("RemoveDepartment")]
        public IActionResult RemoveDepartmentInProduct([FromBody] ProductDepartment productDeparment)
        {
            try
            {
                _productData.RemoveDepartmentToProduct(productDeparment);
                return Ok();
            }
            catch (Exception ex)
            {
                return Problem(ex.Message, nameof(RemoveDepartmentInProduct), StatusCodes.Status500InternalServerError, "Fail removing the department in product.");
            }
        }
    }
}