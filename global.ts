const response = {
  body:{},
  statusCode: 200
}
const __requestAtlassian = jest.fn().mockReturnValue(response);
(global as any).api = {
    fetch,
    asApp() {
      return {
        __requestAtlassian
      };
    }
  };