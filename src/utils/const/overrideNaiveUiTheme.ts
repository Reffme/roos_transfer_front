import type { GlobalThemeOverrides } from 'naive-ui';

const mainSuccessButtonColor = '#282828';
const mainPassedButtonColor = '#A0A0A0';
const mainButtonColorHover = '#2C7CB0';

export const overrideNaiveUiTheme: GlobalThemeOverrides = {
  common: {
    primaryColor: mainSuccessButtonColor,
    borderRadius: '4px',
    placeholderColor:'#A0A0A0',
    primaryColorHover: mainPassedButtonColor,
    primaryColorPressed: mainButtonColorHover,
  },
  Tabs: {
    tabBorderRadius: '24px',
    tabColorSegment: '#FDEC8BFF'
  },
  Button: {
    textColorHover: mainButtonColorHover,
    textColorPressed: mainPassedButtonColor,
    textColorFocus: mainButtonColorHover,
    textColorTextHover: mainButtonColorHover,
    textColorTextPressed: mainPassedButtonColor,
    textColorTextFocus: mainButtonColorHover,
    textColorGhostHover: mainButtonColorHover,
    textColorGhostPressed: mainPassedButtonColor,
    textColorGhostFocus: mainButtonColorHover,
    rippleColor: mainButtonColorHover,
    colorPrimary: mainSuccessButtonColor,
    colorHoverPrimary: mainButtonColorHover,
    colorPressedPrimary: mainPassedButtonColor,
    colorFocusPrimary: mainButtonColorHover,
    colorDisabledPrimary: mainSuccessButtonColor,
    textColorTextPrimary: mainSuccessButtonColor,
    textColorTextHoverPrimary: mainButtonColorHover,
    textColorTextPressedPrimary: mainPassedButtonColor,
    textColorTextFocusPrimary: mainButtonColorHover,
    textColorGhostPrimary: mainSuccessButtonColor,
    textColorGhostHoverPrimary: mainButtonColorHover,
    textColorGhostPressedPrimary: mainPassedButtonColor,
    textColorGhostFocusPrimary: mainButtonColorHover,
    textColorGhostDisabledPrimary: mainSuccessButtonColor,
    borderPrimary: `1px solid ${mainSuccessButtonColor}`,
    borderHover: `1px solid ${mainButtonColorHover}`,
    borderHoverPrimary: `1px solid ${mainButtonColorHover}`,
    borderFocusPrimary: `1px solid ${mainButtonColorHover}`,
    borderFocus: `1px solid ${mainButtonColorHover}`,
    borderDisabledPrimary: `1px solid ${mainSuccessButtonColor}`,
    borderPressedPrimary: `1px solid ${mainPassedButtonColor}`,
    rippleColorPrimary: mainSuccessButtonColor,
    colorSuccess: mainSuccessButtonColor,
    colorHoverSuccess: mainButtonColorHover,
    colorPressedSuccess: mainPassedButtonColor,
    colorFocusSuccess: mainButtonColorHover,
    colorDisabledSuccess: mainSuccessButtonColor,
    textColorTextSuccess: mainSuccessButtonColor,
    textColorTextHoverSuccess: mainButtonColorHover,
    textColorTextPressedSuccess: mainPassedButtonColor,
    textColorTextFocusSuccess: mainButtonColorHover,
    textColorGhostSuccess: mainSuccessButtonColor,
    textColorGhostHoverSuccess: mainButtonColorHover,
    textColorGhostPressedSuccess: mainPassedButtonColor,
    textColorGhostFocusSuccess: mainButtonColorHover,
    textColorGhostDisabledSuccess: mainSuccessButtonColor,
    rippleColorSuccess: mainSuccessButtonColor,
    caretColor: mainSuccessButtonColor,
    loadingColor: mainSuccessButtonColor,
    borderSuccess: `1px solid ${mainSuccessButtonColor}`,
    borderDisabledSuccess: `1px solid ${mainSuccessButtonColor}`,
    borderHoverSuccess: `1px solid ${mainButtonColorHover}`,
    borderFocusSuccess: `1px solid ${mainButtonColorHover}`,
    borderPressed: `1px solid ${mainPassedButtonColor}`,
    borderPressedSuccess: `1px solid ${mainPassedButtonColor}`,
  },
  Input: {
    heightLarge: '50px',
    fontSizeLarge: '18px',
    borderRadius: '1px',
    border: '1px solid #A0A0A0',
    borderFocus: '1px solid #A0A0A0',
    caretColor: mainSuccessButtonColor,
    loadingColor: mainSuccessButtonColor,
    borderHover: mainButtonColorHover,
  },
  Menu: {
    itemTextColorActive: mainSuccessButtonColor,
    itemTextColorActiveHover: mainSuccessButtonColor,
    itemTextColorChildActive: mainSuccessButtonColor,
    itemTextColorChildActiveHover: mainSuccessButtonColor,
    itemTextColorHoverHorizontal: mainSuccessButtonColor,
    itemTextColorActiveHorizontal: mainSuccessButtonColor,
    itemTextColorActiveHoverHorizontal: mainSuccessButtonColor,
    itemTextColorChildActiveHorizontal: mainSuccessButtonColor,
    itemTextColorChildActiveHoverHorizon: mainSuccessButtonColor,
    itemIconColorActive: mainSuccessButtonColor,
    itemIconColorActiveHover: mainSuccessButtonColor,
    itemIconColorChildActive: mainSuccessButtonColor,
    itemIconColorChildActiveHover: mainSuccessButtonColor,
    itemIconColorHoverHorizontal: mainSuccessButtonColor,
    itemIconColorActiveHorizontal: mainSuccessButtonColor,
    itemIconColorActiveHoverHorizontal: mainSuccessButtonColor,
    itemIconColorChildActiveHorizontal: mainSuccessButtonColor,
    itemIconColorChildActiveHoverHorizon: mainSuccessButtonColor,
    arrowColorActive: mainSuccessButtonColor,
    arrowColorActiveHover: mainSuccessButtonColor,
    arrowColorChildActive: mainSuccessButtonColor,
    arrowColorChildActiveHover: mainSuccessButtonColor,
  },
  Statistic: {
    valueFontSize: '1rem',
  },
};
