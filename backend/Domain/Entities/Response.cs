namespace back_end.Services.Interfaces
{
    public class Response<T>
    {
        public Response() { }

        public Response(T data, string message = null)
        {
            Success = true;
            Message = message;
            Result = data;
        }

        public Response(string message)
        {
            Success = false;
            Message = message;
        }



        public bool Success { get; set; }
        public string Message { get; set; }
        public T Result { get; set; }
    }
}