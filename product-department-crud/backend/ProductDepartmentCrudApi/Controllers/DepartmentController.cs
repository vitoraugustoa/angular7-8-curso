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
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentData _departmentData;

        public DepartmentController(IDepartmentData departmentData)
        {
            _departmentData = departmentData;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                return Ok(_departmentData.GetAll());
            }
            catch (Exception ex)
            {
                return Problem(ex.Message, nameof(GetAll), StatusCodes.Status500InternalServerError, "Fail getting the departments.");
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            try
            {
                return Ok(_departmentData.GetById(id));
            }
            catch (Exception ex)
            {
                return Problem(ex.Message, nameof(GetById), StatusCodes.Status500InternalServerError, "Fail getting the department.");
            }
        }

        [HttpPost]
        public IActionResult Add([FromBody] Department department)
        {
            try
            {
                return Ok(_departmentData.Add(department));
            }
            catch (Exception ex)
            {
                return Problem(ex.Message, nameof(GetAll), StatusCodes.Status500InternalServerError, "Fail adding the department.");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Remove([FromRoute] int id)
        {
            try
            {
                return Ok(_departmentData.Remove(id));
            }
            catch (Exception ex)
            {
                return Problem(ex.Message, nameof(Remove), StatusCodes.Status500InternalServerError, "Fail removing the department.");
            }
        }

        [HttpPut]
        public IActionResult Update([FromBody] Department department)
        {
            try
            {
                return Ok(_departmentData.Update(department));
            }
            catch (Exception ex)
            {
                return Problem(ex.Message, nameof(Update), StatusCodes.Status500InternalServerError, "Fail removing the department.");
            }
        }
    }
}