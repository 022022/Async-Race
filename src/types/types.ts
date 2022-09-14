export interface GetCars {
  data: Car[],
  count?: string,
}

export interface Car extends HTMLElement {
  name: string,
  color: string,
  id: string
}

export interface NewCar {
  name: string,
  color: string
}

export interface AnimateFunction {
  (id: number, time: number): AnimateHandler;
}

export interface AnimateHandler {
  (timestamp: DOMHighResTimeStamp): void;
}

export type EngineStatus = 'started' | 'stopped';

export type Direction = 'next' | 'prev';

export type RaceResult = '200' | '400' | '404' | '429' | '500';

export type WinnersSorting = 'id' | 'wins' | 'time';

export type WinnersOrder = 'ASC' | 'DESC';

export type SortOptions = 'By wins number (asc)' | 'By best time (asc)' | 'By wins number (desc)' | 'By best time (desc)';

export interface GetWinners {
  (page: number,
    limit: number,
    sort: WinnersSorting,
    order: WinnersOrder): Promise<GetWinnersResult | null>;
}

export interface GetWinnersResult {
  data: WinnerData[],
  count?: string,
}

export interface GetWinner {
  (id: number): Promise<WinnerData>;
}

export interface WinnerData {
  id: number,
  wins: number,
  time: number
}

export interface CreateWinner {
  (winnerData: WinnerData): Promise<number | { data: WinnerData; } | undefined>
}

export interface DeleteWinner {
  (id: number): void;
}

export interface UpdateWinner {
  (id: number,
    winnerData: WinnerData): void;
}

export interface RenderWinnersPage {
  (page: number,
    limit: number,
    sort: WinnersSorting,
    order: WinnersOrder,
    data: { data: WinnerData[]; count?: string } | null,
    pageStructure: PageStructure,
    handlers: Handlers): void,
}

export interface PageStructure {
  wrapper: HTMLElement;
  generalControls: HTMLElement;
  carsInGarage: HTMLElement;
  winners: HTMLElement;
  popup: HTMLElement;
  navigation: HTMLElement;
}

export interface EditHandler {
  (target: EventTarget | null,
    pageStructure: PageStructure, handlers: Handlers): void,
}

export interface CreationHandler {
  (name: string, color: string, page: number,
    pageStructure: PageStructure, handlers: Handlers): Promise<void>;
}

export interface RemoveHandler {
  (target: EventTarget | null, page: number,
    pageStructure: PageStructure, handlers: Handlers): void
}

export interface UpdateHandler {
  (id: string, name: string, color: string): void
}

export interface StartStopHandler {
  (startButton: HTMLElement | null,
    status: EngineStatus,
    stopButton: HTMLElement, pageStructure: PageStructure,
    handlers: Handlers): void;
}

export interface PagingHandler {
  (pageToGo: number, pageStructure: PageStructure, handlers: Handlers): void,
}

export interface GenerateCarsHandler {
  (page: number, pageStructure: PageStructure, handlers: Handlers): void
}

export interface SortHandler {
  (value: string, page: number,
    renderWinnersPage: RenderWinnersPage, pageStructure: PageStructure,
    handlers: Handlers): void;
}

export interface WinnersPagingHandler {
  (pageToGo: number, pageStructure: PageStructure, handlers: Handlers): void
}

export interface ShowGarage {
  (garageTab: HTMLElement, winnersTab: HTMLElement, pageStructure: PageStructure): void;
}

export interface ShowWinners {
  (garageTab: HTMLElement, winnersTab: HTMLElement, pageStructure: PageStructure): void;
}

export interface Handlers {
  editHandler: EditHandler,
  creationHandler: CreationHandler,
  removeHandler: RemoveHandler,
  updateHandler: UpdateHandler,
  startStopHandler: StartStopHandler,
  pagingHandler: PagingHandler,
  generateCarsHandler: GenerateCarsHandler,
  sortHandler: SortHandler,
  winnersPagingHandler: WinnersPagingHandler,
  showGarage: ShowGarage,
  showWinners: ShowWinners,
}
