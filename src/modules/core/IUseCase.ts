export interface IUseCase<IRequest, IResponse> {
  execute(request: IRequest): Promise<IResponse> | Response;
}
