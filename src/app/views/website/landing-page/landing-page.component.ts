import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { loadContentLandingPage } from 'src/app/models/ContentLandingPage/contentlandingpage.actions';
import {
  selectContentLandingLoading,
  selectContentLandingError,
} from 'src/app/models/ContentLandingPage/contentlandingpage.selectors';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  loading$ = this.store.select(selectContentLandingLoading);
  error$ = this.store.select(selectContentLandingError);
  select_loainhadats = [];
  citys = [];
  districts = [];
  districtsCopy = [];
  selectedCity = '0';
  huongnhas = [];
  prices = [];
  dientichs = [];
  title_bds_hot = {
    id: Number,
    name: String,
    children: Number,
    url: String,
    type: String,
    stt: Number,
    type_show: String,
    show_in: String,
  };
  title_nhadat_ban = {
    id: Number,
    name: String,
    children: Number,
    url: String,
    type: String,
    stt: Number,
    type_show: String,
    show_in: String,
  };
  data_nhadat_ban = [];
  nav_nhadat_ban = [];
  banner1 = String;
  banner2 = String;
  title_duan = {
    id: Number,
    name: String,
    children: Number,
    url: String,
    type: String,
    stt: Number,
    type_show: String,
    show_in: String,
  };
  title_tintuc = {
    id: Number,
    name: String,
    children: Number,
    url: String,
    type: String,
    stt: Number,
    type_show: String,
    show_in: String,
  };
  title_doitac = {
    id: Number,
    name: String,
    children: Number,
    url: String,
    type: String,
    stt: Number,
    type_show: String,
    show_in: String,
  };
  contact_header = String;
  contact_detail = String;
  detail_title = String;
  detail_us = String;
  constructor(private store: Store<{ ContentLandingPage: any }>) {}
  ngOnInit(): void {
    this.store
      .select('ContentLandingPage')
      .pipe(take(1))
      .subscribe((initialState) => {
        if (!initialState['data']) {
          this.store.dispatch(loadContentLandingPage());
          this.store.select('ContentLandingPage').subscribe((data) => {
            if (data.data) {
              this.citys = data.data['citys'];
              this.districts = data.data['districts'];
              this.select_loainhadats = data.data['select_loainhadats'];
              this.huongnhas = data.data['huongnhas'];
              this.prices = data.data['prices'];
              this.dientichs = data.data['dientichs'];
              const bien = data.data['doitacs'];
              this.imageDoitac = bien.map((element: any) => element['url']);
              this.slides = data.data['carousels'].map(
                (element: any) => element['url']
              );
              this.title_bds_hot = data.data['title_bds_hot'];
              this.slide_bds_hot = data.data['data_bds_hot'];
              this.title_nhadat_ban = data.data['title_nhadat_ban'];
              this.data_nhadat_ban = data.data['data_nhadat_ban'];
              this.nav_nhadat_ban = data.data['data_nav_nhadat_ban'];
              this.banner1 = data.data['banner1']['url'];
              this.banner2 = data.data['banner2']['url'];
              this.title_duan = data.data['title_duan'];
              this.duan_hot = data.data['data_duan'];
              this.title_tintuc = data.data['title_tintuc'];
              this.title_doitac = data.data['title_doitac'];
              this.tintucs = data.data['data_tintuc'];
              this.contact_header = data.data['contact_header']['detail'];
              this.contact_detail = data.data['contact_detail']['detail'];
              this.detail_title = data.data['detail_title']['detail'];
              this.detail_us = data.data['detail_us']['detail'];
            }
          });
        } else {
          this.citys = initialState.data['citys'];
          this.districts = initialState.data['districts'];
          this.select_loainhadats = initialState.data['select_loainhadats'];
          this.huongnhas = initialState.data['huongnhas'];
          this.prices = initialState.data['prices'];
          this.dientichs = initialState.data['dientichs'];
          const bien = initialState.data['doitacs'];
          this.imageDoitac = bien.map((element: any) => element['url']);
          this.slides = initialState.data['carousels'].map(
            (element: any) => element['url']
          );
          this.title_bds_hot = initialState.data['title_bds_hot'];
          this.slide_bds_hot = initialState.data['data_bds_hot'];
          this.title_nhadat_ban = initialState.data['title_nhadat_ban'];
          this.data_nhadat_ban = initialState.data['data_nhadat_ban'];
          this.nav_nhadat_ban = initialState.data['data_nav_nhadat_ban'];
          this.banner1 = initialState.data['banner1']['url'];
          this.banner2 = initialState.data['banner2']['url'];
          this.title_duan = initialState.data['title_duan'];
          this.duan_hot = initialState.data['data_duan'];
          this.title_tintuc = initialState.data['title_tintuc'];
          this.title_doitac = initialState.data['title_doitac'];
          this.tintucs = initialState.data['data_tintuc'];
          this.contact_header = initialState.data['contact_header']['detail'];
          this.contact_detail = initialState.data['contact_detail']['detail'];
          this.detail_title = initialState.data['detail_title']['detail'];
          this.detail_us = initialState.data['detail_us']['detail'];
        }
      });
  }
  onChangeCity(e: any) {
    if (this.selectedCity != '0') {
      this.districtsCopy = this.districts.filter((item) => {
        return item['province_code'] === this.selectedCity;
      });
    } else {
      this.districtsCopy = [];
    }
  }
  // format tiền việt
  formatVnd(amount: any) {
    var x = parseFloat(amount);
    if (isNaN(x)) {
      return '';
    }
    return x.toLocaleString('vi') + 'đ';
    x;
  }
  // tìm kiếm nâng cao
  search2 = false;
  opensearch2() {
    this.search2 = !this.search2;
  }
  //carousel đầu trang
  slides = [];
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 3000,
    infinite: true,
    dots: false,
  };
  @ViewChild('slickModal', { static: false }) slickModal: any;

  next() {
    if (this.slickModal) {
      this.slickModal.slickNext();
    }
  }

  prev() {
    if (this.slickModal) {
      this.slickModal.slickPrev();
    }
  }
  // slide bất động sản hot
  slide_bds_hot = [];
  slideConfig2 = {
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
    infinite: true,
    dots: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  @ViewChild('slickModal2', { static: false }) slickModal2: any;
  next2() {
    if (this.slickModal2) {
      this.slickModal2.slickNext();
    }
  }

  prev2() {
    if (this.slickModal2) {
      this.slickModal2.slickPrev();
    }
  }
  // slide 3
  duan_hot = [];
  slideConfig3 = {
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
    infinite: true,
    dots: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  @ViewChild('slickModal3', { static: false }) slickModal3: any;
  next3() {
    if (this.slickModal3) {
      this.slickModal3.slickNext();
    }
  }

  prev3() {
    if (this.slickModal3) {
      this.slickModal3.slickPrev();
    }
  }
  tintucs = [];
  slideConfig4 = {
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
    infinite: true,
    dots: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  @ViewChild('slickModal4', { static: false }) slickModal4: any;
  next4() {
    if (this.slickModal4) {
      this.slickModal4.slickNext();
    }
  }

  prev4() {
    if (this.slickModal4) {
      this.slickModal4.slickPrev();
    }
  }
  //đối tác
  imageDoitac = [];
  slideConfig5 = {
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
    infinite: true,
    dots: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  @ViewChild('slickModal5', { static: false }) slickModal5: any;
  next5() {
    if (this.slickModal5) {
      this.slickModal5.slickNext();
    }
  }

  prev5() {
    if (this.slickModal5) {
      this.slickModal5.slickPrev();
    }
  }
}
