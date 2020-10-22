using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace WebApiC.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ServiceCController : ControllerBase
    {
        private readonly ILogger<ServiceCController> _logger;

        public ServiceCController(ILogger<ServiceCController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public Feature Get()
        {
            return new Feature
            {
                Color = "Gray",
                Description = "Feature C : Third Version of this feature",
                Name = "Feature C",
                Version = "V3.0"

            };
        }
    }
}
