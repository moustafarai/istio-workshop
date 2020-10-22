using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace WebApiD.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ServiceDController : ControllerBase
    {
        private readonly ILogger<ServiceDController> _logger;

        public ServiceDController(ILogger<ServiceDController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public Feature Get()
        {
            return new Feature
            {
                Color = "Red",
                Description = "Feature D : Third Version of this feature",
                Name = "Feature D",
                Version = "V3.0"

            };
        }
    }
}
