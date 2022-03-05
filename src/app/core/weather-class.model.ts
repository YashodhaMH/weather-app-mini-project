export class WeatherClass {
  id: any;
  name: any;
  state: any;
  iconid: any;
  c: any;
  desc: any;
  isLiked: any;

  constructor(
    id: any,
    name: any,
    state: any,
    iconid: any,
    c: any,
    desc: any,
    isLiked: any
  ) {
    this.id = id;
    this.name = name;
    this.state = state;
    this.iconid = iconid;
    this.c = c;
    this.desc = desc;
    this.isLiked = isLiked;
  }
}
