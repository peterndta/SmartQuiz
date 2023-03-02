using System.Runtime.InteropServices;

namespace SmartQuizApi.Services.Utils
{
    public class Response
    {
        public int statusCode { get; set; }
        public object data { get; set; }
        public string message { get; set; }
        public bool isSuccess { get; set; }
        public PaginationMeta meta { get; set; }

        public Response(int statusCode, [Optional] object? data, [Optional] string message, [Optional] PaginationMeta meta)
        {
            this.statusCode = statusCode;
            this.isSuccess = true;
            this.data = data;
            this.message = message;
            this.meta = meta;
        }

        public Response(int statusCode, string message)
        {
            this.statusCode = statusCode;
            this.message = message;
            this.isSuccess = false;
        }
    }
}

