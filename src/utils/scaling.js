import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

// Kiểm tra xem thiết bị có phải là tablet hay không
export const isTablet = width >= 600 || Platform.isPad;

// Xác định chiều dài và chiều rộng ngắn/dài của màn hình
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

// Định nghĩa kích thước cơ sở cho các thiết bị
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 852;

// Hàm scale để điều chỉnh kích thước theo màn hình
export const scale = size =>
  (isTablet
    ? longDimension / guidelineBaseHeight
    : shortDimension / guidelineBaseWidth) * size;
