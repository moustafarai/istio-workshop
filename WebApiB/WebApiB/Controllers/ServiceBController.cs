using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace WebApiB.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ServiceBController : ControllerBase
    {
        private readonly ILogger<ServiceBController> _logger;

        public ServiceBController(ILogger<ServiceBController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public Feature Get()
        {
            return new Feature
            {
                Color = "White",
                Description = "Feature B : Third Version of this feature",
                Name = "Feature B",
                Version = "V3.0"

            };
        }
    }
}
