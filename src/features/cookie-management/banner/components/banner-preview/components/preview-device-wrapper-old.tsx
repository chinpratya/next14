import { css } from '@emotion/css';
import React from 'react';

export type PreviewDeviceWrapperProps = {
  children: React.ReactNode;
};

export const PreviewDeviceWrapperOld = ({
  children,
}: PreviewDeviceWrapperProps) => {
  return (
    <div
      className={css`
        @media (min-width: 320px) {
           {
            & .device,
            & .device *,
            & .device :after,
            & .device :before,
            & .device :after,
            & .device :before {
              box-sizing: border-box;
              display: block;
            }

            & .device {
              position: relative;
              transform: scale(1);
              z-index: 1;

              & .device-frame {
                z-index: 1;
              }

              & .device-content {
                background-color: #fff;
                background-position: center center;
                background-size: cover;
                object-fit: cover;
                position: relative;
              }

              &.device-macbook-pro {
                height: ${444 - (444 * 70) / 100}px;
                width: ${740 - (740 * 70) / 100}px;
                margin: auto;
                border: 0;

                & .device-frame {
                  background: #0d0d0d;
                  border-radius: ${20 -
                  (20 * 70) / 100}px;
                  box-shadow: inset 0 0 0
                    ${2 - (2 * 70) / 100}px #c8cacb;
                  height: ${428 - (428 * 70) / 100}px;
                  margin: 0 auto;
                  padding: ${29 - (29 * 70) / 100}px
                    ${19 - (19 * 70) / 100}px
                    ${39 - (39 * 70) / 100}px
                    ${19 - (19 * 70) / 100}px;
                  position: relative;
                  width: ${614 - (614 * 70) / 100}px;

                  &:after {
                    background: #272626;
                    border-radius: 0 0
                      ${20 - (20 * 70) / 100}px
                      ${20 - (20 * 70) / 100}px;
                    bottom: ${2 - (2 * 70) / 100}px;
                    content: '';
                    height: ${26 - (26 * 70) / 100}px;
                    left: ${2 - (2 * 70) / 100}px;
                    position: absolute;
                    width: ${610 - (610 * 70) / 100}px;
                  }

                  &:before {
                    bottom: ${10 - (10 * 70) / 100}px;
                    color: #c8cacb;
                    content: '';
                    font-size: ${12 - (12 * 70) / 100}px;
                    height: ${16 - (16 * 70) / 100}px;
                    left: 50%;
                    line-height: ${16 -
                    (16 * 70) / 100}px;
                    margin-left: ${-100 -
                    (-100 * 70) / 100}px;
                    position: absolute;
                    text-align: center;
                    width: ${200 - (200 * 70) / 100}px;
                    z-index: 1;
                  }

                  & iframe {
                    width: 1144px;
                    height: 721px;
                    border: 0;
                    -ms-transform: scale(0.15);
                    -moz-transform: scale(0.15);
                    -o-transform: scale(0.15);
                    -webkit-transform: scale(0.15);
                    transform: scale(0.15);
                    -ms-transform-origin: 0 0;
                    -moz-transform-origin: 0 0;
                    -o-transform-origin: 0 0;
                    -webkit-transform-origin: 0 0;
                    transform-origin: 0 0;
                  }
                }

                & .device-content {
                  border: ${2 - (2 * 70) / 100}px solid
                    #121212;
                  border-radius: ${2 - (2 * 70) / 100}px;
                  height: ${360 - (360 * 70) / 100}px;
                  width: ${576 - (576 * 70) / 100}px;
                }

                & .device-power {
                  background: #e2e3e4;
                  border: solid #d5d6d8;
                  border-radius: ${2 - (2 * 70) / 100}px
                    ${2 - (2 * 70) / 100}px 0 0;
                  border-width: ${2 - (2 * 70) / 100}px
                    ${4 - (4 * 70) / 100}px 0
                    ${4 - (4 * 70) / 100}px;
                  height: ${14 - (14 * 70) / 100}px;
                  margin-top: ${-10 - (-10 * 70) / 100}px;
                  position: relative;
                  width: ${740 - (740 * 70) / 100}px;
                  z-index: 9;

                  &:after,
                  &:before {
                    content: '';
                    position: absolute;
                  }

                  &:after {
                    background: #d5d6d8;
                    border-radius: 0 0
                      ${10 - (10 * 70) / 100}px
                      ${10 - (10 * 70) / 100}px;
                    box-shadow: inset 0 0
                      ${4 - (4 * 70) / 100}px
                      ${2 - (2 * 70) / 100}px #babdbf;
                    height: ${10 - (10 * 70) / 100}px;
                    left: 50%;
                    margin-left: ${-60 -
                    (-60 * 70) / 100}px;
                    top: ${-2 - (-2 * 70) / 100}px;
                    width: ${120 - (120 * 70) / 100}px;
                  }

                  &:before {
                    background: #a0a3a7;
                    border-radius: 0 0
                      ${180 - (180 * 70) / 100}px
                      ${180 - (180 * 70) / 100}px / 0 0
                      ${12 - (12 * 70) / 100}px
                      ${12 - (12 * 70) / 100}px;
                    box-shadow: inset 0
                      ${-2 - (-2 * 70) / 100}px
                      ${6 - (6 * 70) / 100}px 0 #474a4d;
                    height: ${12 - (12 * 70) / 100}px;
                    left: ${-4 - (-4 * 70) / 100}px;
                    margin: 0 auto;
                    top: ${10 - (10 * 70) / 100}px;
                    width: ${740 - (740 * 70) / 100}px;
                  }
                }
              }

              &.device-ipad-pro {
                height: ${804 - (804 * 80) / 100}px;
                width: ${560 - (560 * 80) / 100}px;
                margin: auto;

                & .device-frame {
                  background: #0d0d0d;
                  border-radius: ${38 -
                  (38 * 80) / 100}px;
                  box-shadow: inset 0 0 0
                      ${2 - (2 * 80) / 100}px #c8cacb,
                    inset 0 0 0 ${6 - (6 * 80) / 100}px
                      #e2e3e4;
                  height: ${804 - (804 * 80) / 100}px;
                  padding: ${62 - (62 * 80) / 100}px
                    ${25 - (25 * 80) / 100}px;
                  width: ${560 - (560 * 80) / 100}px;

                  & iframe {
                    width: 685px;
                    height: 910px;
                    border: 0;
                    -ms-transform: scale(0.15);
                    -moz-transform: scale(0.15);
                    -o-transform: scale(0.15);
                    -webkit-transform: scale(0.15);
                    transform: scale(0.15);
                    -ms-transform-origin: 0 0;
                    -moz-transform-origin: 0 0;
                    -o-transform-origin: 0 0;
                    -webkit-transform-origin: 0 0;
                    transform-origin: 0 0;
                  }
                }

                & .device-content {
                  border: ${2 - (2 * 80) / 100}px solid
                    #222;
                  border-radius: ${2 - (2 * 80) / 100}px;
                  height: ${680 - (680 * 80) / 100}px;
                  width: ${510 - (510 * 80) / 100}px;
                }

                & .device-header {
                  border: ${2 - (2 * 80) / 100}px solid
                    #c8cacb;
                  border-radius: 50%;
                  bottom: ${17 - (17 * 80) / 100}px;
                  height: ${34 - (34 * 80) / 100}px;
                  left: 50%;
                  margin-left: ${-17 -
                  (-17 * 80) / 100}px;
                  position: absolute;
                  width: ${34 - (34 * 80) / 100}px;
                }

                & .device-sensors {
                  background: #666;
                  border-radius: 50%;
                  height: ${10 - (10 * 80) / 100}px;
                  left: 50%;
                  margin-left: ${-5 - (-5 * 80) / 100}px;
                  margin-top: ${-5 - (-5 * 80) / 100}px;
                  position: absolute;
                  top: ${34 - (34 * 80) / 100}px;
                  width: ${10 - (10 * 80) / 100}px;
                }

                &.device-gold {
                  & .device-frame {
                    box-shadow: inset 0 0 0
                        ${2 - (2 * 80) / 100}px #e4b08a,
                      inset 0 0 0 ${6 - (6 * 80) / 100}px
                        #f7e8dd;
                  }

                  & .device-header {
                    border-color: #e4b08a;
                  }
                }

                &.device-rosegold {
                  & .device-frame {
                    box-shadow: inset 0 0 0
                        ${2 - (2 * 80) / 100}px #f6a69a,
                      inset 0 0 0 ${6 - (6 * 80) / 100}px
                        #facfc9;
                  }

                  & .device-header {
                    border-color: #f6a69a;
                  }
                }

                &.device-spacegray {
                  & .device-frame {
                    background: #222;
                    box-shadow: inset 0 0 0
                        ${2 - (2 * 80) / 100}px #818187,
                      inset 0 0 0 ${6 - (6 * 80) / 100}px
                        #9b9ba0;
                  }

                  & .device-header {
                    border-color: #818187;
                  }
                }
              }

              &.device-iphone-x {
                height: ${868 - (868 * 85) / 100}px;
                width: ${428 - (428 * 85) / 100}px;
                margin: auto;

                & .device-frame {
                  background: #222;
                  border-radius: ${68 -
                  (68 * 85) / 100}px;
                  box-shadow: inset 0 0
                      ${2 - (2 * 85) / 100}px
                      ${2 - (2 * 85) / 100}px #c8cacb,
                    inset 0 0 0 ${7 - (7 * 85) / 100}px
                      #e2e3e4;
                  height: ${868 - (868 * 85) / 100}px;
                  padding: ${28 - (28 * 85) / 100}px;
                  width: ${428 - (428 * 85) / 100}px;
                  overflow: hidden;

                  & iframe {
                    border-radius: ${68 -
                    (68 * 85) / 100}px;
                    box-shadow: inset 0 0
                        ${2 - (2 * 85) / 100}px
                        ${2 - (2 * 85) / 100}px #c8cacb,
                      inset 0 0 0 ${7 - (7 * 85) / 100}px
                        #e2e3e4;
                    width: 556px;
                    height: 1211px;
                    border: 0;
                    -ms-transform: scale(0.1);
                    -moz-transform: scale(0.1);
                    -o-transform: scale(0.1);
                    -webkit-transform: scale(0.1);
                    transform: scale(0.1);
                    -ms-transform-origin: 0 0;
                    -moz-transform-origin: 0 0;
                    -o-transform-origin: 0 0;
                    -webkit-transform-origin: 0 0;
                    transform-origin: 0 0;
                  }
                }

                & .device-content {
                  border-radius: ${40 -
                  (40 * 85) / 100}px;
                  height: ${812 - (812 * 85) / 100}px;
                  width: ${375 - (375 * 85) / 100}px;
                }

                & .device-stripe {
                  &:after,
                  &:before {
                    border: solid rgba(51, 51, 51, 0.25);
                    border-width: 0
                      ${7 - (7 * 85) / 100}px;
                    content: '';
                    height: ${7 - (7 * 85) / 100}px;
                    left: 0;
                    position: absolute;
                    width: 100%;
                    z-index: 9;
                  }

                  &:after {
                    top: ${85 - (85 * 85) / 100}px;
                  }

                  &:before {
                    bottom: ${85 - (85 * 85) / 100}px;
                  }
                }

                & .device-header {
                  background: #222;
                  border-bottom-left-radius: ${20 -
                  (20 * 85) / 100}px;
                  border-bottom-right-radius: ${20 -
                  (20 * 85) / 100}px;
                  height: ${30 - (30 * 85) / 100}px;
                  left: 50%;
                  margin-left: ${-102 -
                  (-102 * 85) / 100}px;
                  position: absolute;
                  top: ${28 - (28 * 85) / 100}px;
                  width: ${204 - (204 * 85) / 100}px;

                  &:after,
                  &:before {
                    content: '';
                    height: ${10 - (10 * 85) / 100}px;
                    position: absolute;
                    top: 0;
                    width: ${10 - (10 * 85) / 100}px;
                  }

                  &:after {
                    background: radial-gradient(
                      circle at bottom left,
                      transparent 0,
                      transparent 75%,
                      #222 75%,
                      #222 100%
                    );
                    left: ${-10 - (-10 * 85) / 100}px;
                  }

                  &:before {
                    background: radial-gradient(
                      circle at bottom right,
                      transparent 0,
                      transparent 75%,
                      #222 75%,
                      #222 100%
                    );
                    right: ${-10 - (-10 * 85) / 100}px;
                  }
                }

                & .device-sensors {
                  &:after,
                  &:before {
                    content: '';
                    position: absolute;
                  }

                  &:after {
                    background: #444;
                    border-radius: ${3 -
                    (3 * 85) / 100}px;
                    height: ${6 - (6 * 85) / 100}px;
                    left: 50%;
                    margin-left: -25
                      ${180 - (180 * 85) / 100}px;
                    top: ${32 - (32 * 85) / 100}px;
                    width: ${50 - (50 * 85) / 100}px;
                  }

                  &:before {
                    background: #444;
                    border-radius: 50%;
                    height: ${14 - (14 * 85) / 100}px;
                    left: 50%;
                    margin-left: ${40 -
                    (40 * 85) / 100}px;
                    top: ${28 - (28 * 85) / 100}px;
                    width: ${14 - (14 * 85) / 100}px;
                  }
                }

                & .device-btns {
                  background: #c8cacb;
                  height: ${32 - (32 * 85) / 100}px;
                  left: ${-3 - (-3 * 85) / 100}px;
                  position: absolute;
                  top: ${115 - (115 * 85) / 100}px;
                  width: ${3 - (3 * 85) / 100}px;

                  &:after,
                  &:before {
                    background: #c8cacb;
                    content: '';
                    height: ${62 - (62 * 85) / 100}px;
                    left: 0;
                    position: absolute;
                    width: ${3 - (3 * 85) / 100}px;
                  }

                  &:after {
                    top: ${60 - (60 * 85) / 100}px;
                  }

                  &:before {
                    top: ${140 - (140 * 85) / 100}px;
                  }
                }

                & .device-power {
                  background: #c8cacb;
                  height: ${100 - (100 * 85) / 100}px;
                  position: absolute;
                  right: ${-3 - (-3 * 85) / 100}px;
                  top: ${200 - (200 * 85) / 100}px;
                  width: ${3 - (3 * 85) / 100}px;
                }
              }
            }
          }
        }
        @media (min-width: 481px) {
          & .device,
          & .device *,
          & .device :after,
          & .device :before,
          & .device :after,
          & .device :before {
            box-sizing: border-box;
            display: block;
          }

          & .device {
            position: relative;
            transform: scale(1);
            z-index: 1;

            & .device-frame {
              z-index: 1;
            }

            & .device-content {
              background-color: #fff;
              background-position: center center;
              background-size: cover;
              object-fit: cover;
              position: relative;
            }

            &.device-macbook-pro {
              height: ${444 - (444 * 70) / 100}px;
              width: ${740 - (740 * 70) / 100}px;
              margin: auto;
              border: 0;

              & .device-frame {
                background: #0d0d0d;
                border-radius: ${20 - (20 * 70) / 100}px;
                box-shadow: inset 0 0 0
                  ${2 - (2 * 70) / 100}px #c8cacb;
                height: ${428 - (428 * 70) / 100}px;
                margin: 0 auto;
                padding: ${29 - (29 * 70) / 100}px
                  ${19 - (19 * 70) / 100}px
                  ${39 - (39 * 70) / 100}px
                  ${19 - (19 * 70) / 100}px;
                position: relative;
                width: ${614 - (614 * 70) / 100}px;

                &:after {
                  background: #272626;
                  border-radius: 0 0
                    ${20 - (20 * 70) / 100}px
                    ${20 - (20 * 70) / 100}px;
                  bottom: ${2 - (2 * 70) / 100}px;
                  content: '';
                  height: ${26 - (26 * 70) / 100}px;
                  left: ${2 - (2 * 70) / 100}px;
                  position: absolute;
                  width: ${610 - (610 * 70) / 100}px;
                }

                &:before {
                  bottom: ${10 - (10 * 70) / 100}px;
                  color: #c8cacb;
                  content: '';
                  font-size: ${12 - (12 * 70) / 100}px;
                  height: ${16 - (16 * 70) / 100}px;
                  left: 50%;
                  line-height: ${16 - (16 * 70) / 100}px;
                  margin-left: ${-100 -
                  (-100 * 70) / 100}px;
                  position: absolute;
                  text-align: center;
                  width: ${200 - (200 * 70) / 100}px;
                  z-index: 1;
                }

                & iframe {
                  width: ${1434 - (1434 * 70) / 100}px;
                  height: ${895 - (895 * 70) / 100}px;
                  border: 0;
                  -ms-transform: scale(0.4);
                  -moz-transform: scale(0.4);
                  -o-transform: scale(0.4);
                  -webkit-transform: scale(0.4);
                  transform: scale(0.4);
                  -ms-transform-origin: 0 0;
                  -moz-transform-origin: 0 0;
                  -o-transform-origin: 0 0;
                  -webkit-transform-origin: 0 0;
                  transform-origin: 0 0;
                }
              }

              & .device-content {
                border: ${2 - (2 * 70) / 100}px solid
                  #121212;
                border-radius: ${2 - (2 * 70) / 100}px;
                height: ${360 - (360 * 70) / 100}px;
                width: ${576 - (576 * 70) / 100}px;
              }

              & .device-power {
                background: #e2e3e4;
                border: solid #d5d6d8;
                border-radius: ${2 - (2 * 70) / 100}px
                  ${2 - (2 * 70) / 100}px 0 0;
                border-width: ${2 - (2 * 70) / 100}px
                  ${4 - (4 * 70) / 100}px 0
                  ${4 - (4 * 70) / 100}px;
                height: ${14 - (14 * 70) / 100}px;
                margin-top: ${-10 - (-10 * 70) / 100}px;
                position: relative;
                width: ${740 - (740 * 70) / 100}px;
                z-index: 9;

                &:after,
                &:before {
                  content: '';
                  position: absolute;
                }

                &:after {
                  background: #d5d6d8;
                  border-radius: 0 0
                    ${10 - (10 * 70) / 100}px
                    ${10 - (10 * 70) / 100}px;
                  box-shadow: inset 0 0
                    ${4 - (4 * 70) / 100}px
                    ${2 - (2 * 70) / 100}px #babdbf;
                  height: ${10 - (10 * 70) / 100}px;
                  left: 50%;
                  margin-left: ${-60 -
                  (-60 * 70) / 100}px;
                  top: ${-2 - (-2 * 70) / 100}px;
                  width: ${120 - (120 * 70) / 100}px;
                }

                &:before {
                  background: #a0a3a7;
                  border-radius: 0 0
                    ${180 - (180 * 70) / 100}px
                    ${180 - (180 * 70) / 100}px / 0 0
                    ${12 - (12 * 70) / 100}px
                    ${12 - (12 * 70) / 100}px;
                  box-shadow: inset 0
                    ${-2 - (-2 * 70) / 100}px
                    ${6 - (6 * 70) / 100}px 0 #474a4d;
                  height: ${12 - (12 * 70) / 100}px;
                  left: ${-4 - (-4 * 70) / 100}px;
                  margin: 0 auto;
                  top: ${10 - (10 * 70) / 100}px;
                  width: ${740 - (740 * 70) / 100}px;
                }
              }
            }

            &.device-ipad-pro {
              height: ${804 - (804 * 70) / 100}px;
              width: ${560 - (560 * 70) / 100}px;
              margin: auto;

              & .device-frame {
                background: #0d0d0d;
                border-radius: ${38 - (38 * 70) / 100}px;
                box-shadow: inset 0 0 0
                    ${2 - (2 * 70) / 100}px #c8cacb,
                  inset 0 0 0 ${6 - (6 * 70) / 100}px
                    #e2e3e4;
                height: ${804 - (804 * 70) / 100}px;
                padding: ${62 - (62 * 70) / 100}px
                  ${25 - (25 * 70) / 100}px;
                width: ${560 - (560 * 70) / 100}px;

                & iframe {
                  width: ${848 - (848 * 70) / 100}px;
                  height: ${1132 - (1132 * 70) / 100}px;
                  border: 0;
                  -ms-transform: scale(0.6);
                  -moz-transform: scale(0.6);
                  -o-transform: scale(0.6);
                  -webkit-transform: scale(0.6);
                  transform: scale(0.6);
                  -ms-transform-origin: 0 0;
                  -moz-transform-origin: 0 0;
                  -o-transform-origin: 0 0;
                  -webkit-transform-origin: 0 0;
                  transform-origin: 0 0;
                }
              }

              & .device-content {
                border: ${2 - (2 * 70) / 100}px solid #222;
                border-radius: ${2 - (2 * 70) / 100}px;
                height: ${680 - (680 * 70) / 100}px;
                width: ${510 - (510 * 70) / 100}px;
              }

              & .device-header {
                border: ${2 - (2 * 70) / 100}px solid
                  #c8cacb;
                border-radius: 50%;
                bottom: ${17 - (17 * 70) / 100}px;
                height: ${34 - (34 * 70) / 100}px;
                left: 50%;
                margin-left: ${-17 - (-17 * 70) / 100}px;
                position: absolute;
                width: ${34 - (34 * 70) / 100}px;
              }

              & .device-sensors {
                background: #666;
                border-radius: 50%;
                height: ${10 - (10 * 70) / 100}px;
                left: 50%;
                margin-left: ${-5 - (-5 * 70) / 100}px;
                margin-top: ${-5 - (-5 * 70) / 100}px;
                position: absolute;
                top: ${34 - (34 * 70) / 100}px;
                width: ${10 - (10 * 70) / 100}px;
              }

              &.device-gold {
                & .device-frame {
                  box-shadow: inset 0 0 0
                      ${2 - (2 * 70) / 100}px #e4b08a,
                    inset 0 0 0 ${6 - (6 * 70) / 100}px
                      #f7e8dd;
                }

                & .device-header {
                  border-color: #e4b08a;
                }
              }

              &.device-rosegold {
                & .device-frame {
                  box-shadow: inset 0 0 0
                      ${2 - (2 * 70) / 100}px #f6a69a,
                    inset 0 0 0 ${6 - (6 * 70) / 100}px
                      #facfc9;
                }

                & .device-header {
                  border-color: #f6a69a;
                }
              }

              &.device-spacegray {
                & .device-frame {
                  background: #222;
                  box-shadow: inset 0 0 0
                      ${2 - (2 * 70) / 100}px #818187,
                    inset 0 0 0 ${6 - (6 * 70) / 100}px
                      #9b9ba0;
                }

                & .device-header {
                  border-color: #818187;
                }
              }
            }

            &.device-iphone-x {
              height: ${868 - (868 * 70) / 100}px;
              width: ${428 - (428 * 70) / 100}px;
              margin: auto;

              & .device-frame {
                background: #222;
                border-radius: ${68 - (68 * 70) / 100}px;
                box-shadow: inset 0 0
                    ${2 - (2 * 70) / 100}px
                    ${2 - (2 * 70) / 100}px #c8cacb,
                  inset 0 0 0 ${7 - (7 * 70) / 100}px
                    #e2e3e4;
                height: ${868 - (868 * 70) / 100}px;
                padding: ${28 - (28 * 70) / 100}px;
                width: ${428 - (428 * 70) / 100}px;
              }

              & .device-content {
                border-radius: ${40 - (40 * 70) / 100}px;
                height: ${812 - (812 * 70) / 100}px;
                width: ${375 - (375 * 70) / 100}px;
              }

              & .device-stripe {
                &:after,
                &:before {
                  border: solid rgba(51, 51, 51, 0.25);
                  border-width: 0 ${7 - (7 * 70) / 100}px;
                  content: '';
                  height: ${7 - (7 * 70) / 100}px;
                  left: 0;
                  position: absolute;
                  width: 100%;
                  z-index: 9;
                }

                &:after {
                  top: ${85 - (85 * 70) / 100}px;
                }

                &:before {
                  bottom: ${85 - (85 * 70) / 100}px;
                }
              }

              & .device-header {
                background: #222;
                border-bottom-left-radius: ${20 -
                (20 * 70) / 100}px;
                border-bottom-right-radius: ${20 -
                (20 * 70) / 100}px;
                height: ${30 - (30 * 70) / 100}px;
                left: 50%;
                margin-left: ${-102 -
                (-102 * 70) / 100}px;
                position: absolute;
                top: ${28 - (28 * 70) / 100}px;
                width: ${204 - (204 * 70) / 100}px;

                &:after,
                &:before {
                  content: '';
                  height: ${10 - (10 * 70) / 100}px;
                  position: absolute;
                  top: 0;
                  width: ${10 - (10 * 70) / 100}px;
                }

                &:after {
                  background: radial-gradient(
                    circle at bottom left,
                    transparent 0,
                    transparent 75%,
                    #222 75%,
                    #222 100%
                  );
                  left: ${-10 - (-10 * 70) / 100}px;
                }

                &:before {
                  background: radial-gradient(
                    circle at bottom right,
                    transparent 0,
                    transparent 75%,
                    #222 75%,
                    #222 100%
                  );
                  right: ${-10 - (-10 * 70) / 100}px;
                }
              }

              & .device-sensors {
                &:after,
                &:before {
                  content: '';
                  position: absolute;
                }

                &:after {
                  background: #444;
                  border-radius: ${3 - (3 * 70) / 100}px;
                  height: ${6 - (6 * 70) / 100}px;
                  left: 50%;
                  margin-left: -25
                    ${180 - (180 * 70) / 100}px;
                  top: ${32 - (32 * 70) / 100}px;
                  width: ${50 - (50 * 70) / 100}px;
                }

                &:before {
                  background: #444;
                  border-radius: 50%;
                  height: ${14 - (14 * 70) / 100}px;
                  left: 50%;
                  margin-left: ${40 - (40 * 70) / 100}px;
                  top: ${28 - (28 * 70) / 100}px;
                  width: ${14 - (14 * 70) / 100}px;
                }
              }

              & .device-btns {
                background: #c8cacb;
                height: ${32 - (32 * 70) / 100}px;
                left: ${-3 - (-3 * 70) / 100}px;
                position: absolute;
                top: ${115 - (115 * 70) / 100}px;
                width: ${3 - (3 * 70) / 100}px;

                &:after,
                &:before {
                  background: #c8cacb;
                  content: '';
                  height: ${62 - (62 * 70) / 100}px;
                  left: 0;
                  position: absolute;
                  width: ${3 - (3 * 70) / 100}px;
                }

                &:after {
                  top: ${60 - (60 * 70) / 100}px;
                }

                &:before {
                  top: ${140 - (140 * 70) / 100}px;
                }
              }

              & .device-power {
                background: #c8cacb;
                height: ${100 - (100 * 70) / 100}px;
                position: absolute;
                right: ${-3 - (-3 * 70) / 100}px;
                top: ${200 - (200 * 70) / 100}px;
                width: ${3 - (3 * 70) / 100}px;
              }
            }
          }
        }
        @media (min-width: 641px) {
          & .device,
          & .device *,
          & .device :after,
          & .device :before,
          & .device :after,
          & .device :before {
            box-sizing: border-box;
            display: block;
          }

          & .device {
            position: relative;
            transform: scale(1);
            z-index: 1;

            & .device-frame {
              z-index: 1;
            }

            & .device-content {
              background-color: #fff;
              background-position: center center;
              background-size: cover;
              object-fit: cover;
              position: relative;
            }

            &.device-macbook-pro {
              height: ${444 - (444 * 10) / 100}px;
              width: ${740 - (740 * 10) / 100}px;
              margin: auto;
              border: 0;

              & .device-frame {
                background: #0d0d0d;
                border-radius: ${20 - (20 * 10) / 100}px;
                box-shadow: inset 0 0 0
                  ${2 - (2 * 10) / 100}px #c8cacb;
                height: ${428 - (428 * 10) / 100}px;
                margin: 0 auto;
                padding: ${29 - (29 * 10) / 100}px
                  ${19 - (19 * 10) / 100}px
                  ${39 - (39 * 10) / 100}px
                  ${19 - (19 * 10) / 100}px;
                position: relative;
                width: ${614 - (614 * 10) / 100}px;

                &:after {
                  background: #272626;
                  border-radius: 0 0
                    ${20 - (20 * 10) / 100}px
                    ${20 - (20 * 10) / 100}px;
                  bottom: ${2 - (2 * 10) / 100}px;
                  content: '';
                  height: ${26 - (26 * 10) / 100}px;
                  left: ${2 - (2 * 10) / 100}px;
                  position: absolute;
                  width: ${610 - (610 * 10) / 100}px;
                }

                &:before {
                  bottom: ${10 - (10 * 10) / 100}px;
                  color: #c8cacb;
                  content: '';
                  font-size: ${12 - (12 * 10) / 100}px;
                  height: ${16 - (16 * 10) / 100}px;
                  left: 50%;
                  line-height: ${16 - (16 * 10) / 100}px;
                  margin-left: ${-100 -
                  (-100 * 10) / 100}px;
                  position: absolute;
                  text-align: center;
                  width: ${200 - (200 * 10) / 100}px;
                  z-index: 1;
                }

                & iframe {
                  width: 1724px;
                  height: 1076px;
                  border: 0;
                  -ms-transform: scale(0.3);
                  -moz-transform: scale(0.3);
                  -o-transform: scale(0.3);
                  -webkit-transform: scale(0.3);
                  transform: scale(0.3);
                  -ms-transform-origin: 0 0;
                  -moz-transform-origin: 0 0;
                  -o-transform-origin: 0 0;
                  -webkit-transform-origin: 0 0;
                  transform-origin: 0 0;
                }
              }

              & .device-content {
                border: ${2 - (2 * 10) / 100}px solid
                  #121212;
                border-radius: ${2 - (2 * 10) / 100}px;
                height: ${360 - (360 * 10) / 100}px;
                width: ${576 - (576 * 10) / 100}px;
              }

              & .device-power {
                background: #e2e3e4;
                border: solid #d5d6d8;
                border-radius: ${2 - (2 * 10) / 100}px
                  ${2 - (2 * 10) / 100}px 0 0;
                border-width: ${2 - (2 * 10) / 100}px
                  ${4 - (4 * 10) / 100}px 0
                  ${4 - (4 * 10) / 100}px;
                height: ${14 - (14 * 10) / 100}px;
                margin-top: ${-10 - (-10 * 10) / 100}px;
                position: relative;
                width: ${740 - (740 * 10) / 100}px;
                z-index: 9;

                &:after,
                &:before {
                  content: '';
                  position: absolute;
                }

                &:after {
                  background: #d5d6d8;
                  border-radius: 0 0
                    ${10 - (10 * 10) / 100}px
                    ${10 - (10 * 10) / 100}px;
                  box-shadow: inset 0 0
                    ${4 - (4 * 10) / 100}px
                    ${2 - (2 * 10) / 100}px #babdbf;
                  height: ${10 - (10 * 10) / 100}px;
                  left: 50%;
                  margin-left: ${-60 -
                  (-60 * 10) / 100}px;
                  top: ${-2 - (-2 * 10) / 100}px;
                  width: ${120 - (120 * 10) / 100}px;
                }

                &:before {
                  background: #a0a3a7;
                  border-radius: 0 0
                    ${180 - (180 * 10) / 100}px
                    ${180 - (180 * 10) / 100}px / 0 0
                    ${12 - (12 * 10) / 100}px
                    ${12 - (12 * 10) / 100}px;
                  box-shadow: inset 0
                    ${-2 - (-2 * 10) / 100}px
                    ${6 - (6 * 10) / 100}px 0 #474a4d;
                  height: ${12 - (12 * 10) / 100}px;
                  left: ${-4 - (-4 * 10) / 100}px;
                  margin: 0 auto;
                  top: ${10 - (10 * 10) / 100}px;
                  width: ${740 - (740 * 10) / 100}px;
                }
              }

              &.device-spacegray {
                & .device-frame {
                  box-shadow: inset 0 0 0 2px #767a7d;
                }

                & .device-power {
                  background: #909496;
                  border-color: #767a7d;

                  &:after {
                    background: #83878a;
                    box-shadow: inset 0 0 4px 2px #6a6d70;
                  }

                  &:before {
                    background: #515456;
                    box-shadow: inset 0 -2px 6px 0 #000;
                  }
                }
              }
            }

            &.device-ipad-pro {
              height: ${804 - (804 * 50) / 100}px;
              width: ${560 - (560 * 50) / 100}px;
              margin: auto;

              & .device-frame {
                background: #0d0d0d;
                border-radius: ${38 - (38 * 50) / 100}px;
                box-shadow: inset 0 0 0
                    ${2 - (2 * 50) / 100}px #c8cacb,
                  inset 0 0 0 ${6 - (6 * 50) / 100}px
                    #e2e3e4;
                height: ${804 - (804 * 50) / 100}px;
                padding: ${62 - (62 * 50) / 100}px
                  ${25 - (25 * 50) / 100}px;
                width: ${560 - (560 * 50) / 100}px;

                & iframe {
                  width: ${848 - (848 * 50) / 100}px;
                  height: ${1132 - (1132 * 50) / 100}px;
                  border: 0;
                  -ms-transform: scale(0.6);
                  -moz-transform: scale(0.6);
                  -o-transform: scale(0.6);
                  -webkit-transform: scale(0.6);
                  transform: scale(0.6);
                  -ms-transform-origin: 0 0;
                  -moz-transform-origin: 0 0;
                  -o-transform-origin: 0 0;
                  -webkit-transform-origin: 0 0;
                  transform-origin: 0 0;
                }
              }

              & .device-content {
                border: ${2 - (2 * 50) / 100}px solid #222;
                border-radius: ${2 - (2 * 50) / 100}px;
                height: ${680 - (680 * 50) / 100}px;
                width: ${510 - (510 * 50) / 100}px;
              }

              & .device-header {
                border: ${2 - (2 * 50) / 100}px solid
                  #c8cacb;
                border-radius: 50%;
                bottom: ${17 - (17 * 50) / 100}px;
                height: ${34 - (34 * 50) / 100}px;
                left: 50%;
                margin-left: ${-17 - (-17 * 50) / 100}px;
                position: absolute;
                width: ${34 - (34 * 50) / 100}px;
              }

              & .device-sensors {
                background: #666;
                border-radius: 50%;
                height: ${10 - (10 * 50) / 100}px;
                left: 50%;
                margin-left: ${-5 - (-5 * 50) / 100}px;
                margin-top: ${-5 - (-5 * 50) / 100}px;
                position: absolute;
                top: ${34 - (34 * 50) / 100}px;
                width: ${10 - (10 * 50) / 100}px;
              }

              &.device-gold {
                & .device-frame {
                  box-shadow: inset 0 0 0
                      ${2 - (2 * 50) / 100}px #e4b08a,
                    inset 0 0 0 ${6 - (6 * 50) / 100}px
                      #f7e8dd;
                }

                & .device-header {
                  border-color: #e4b08a;
                }
              }

              &.device-rosegold {
                & .device-frame {
                  box-shadow: inset 0 0 0
                      ${2 - (2 * 50) / 100}px #f6a69a,
                    inset 0 0 0 ${6 - (6 * 50) / 100}px
                      #facfc9;
                }

                & .device-header {
                  border-color: #f6a69a;
                }
              }

              &.device-spacegray {
                & .device-frame {
                  background: #222;
                  box-shadow: inset 0 0 0
                      ${2 - (2 * 50) / 100}px #818187,
                    inset 0 0 0 ${6 - (6 * 50) / 100}px
                      #9b9ba0;
                }

                & .device-header {
                  border-color: #818187;
                }
              }
            }

            &.device-iphone-x {
              height: ${868 - (868 * 65) / 100}px;
              width: ${428 - (428 * 65) / 100}px;
              margin: auto;

              & .device-frame {
                background: #222;
                border-radius: ${68 - (68 * 65) / 100}px;
                box-shadow: inset 0 0
                    ${2 - (2 * 65) / 100}px
                    ${2 - (2 * 65) / 100}px #c8cacb,
                  inset 0 0 0 ${7 - (7 * 65) / 100}px
                    #e2e3e4;
                height: ${868 - (868 * 65) / 100}px;
                padding: ${28 - (28 * 65) / 100}px;
                width: ${428 - (428 * 65) / 100}px;

                & iframe {
                  width: 371px;
                  height: 810px;
                  border: 0;
                  -ms-transform: scale(0.35);
                  -moz-transform: scale(0.35);
                  -o-transform: scale(0.35);
                  -webkit-transform: scale(0.35);
                  transform: scale(0.35);
                  -ms-transform-origin: 0 0;
                  -moz-transform-origin: 0 0;
                  -o-transform-origin: 0 0;
                  -webkit-transform-origin: 0 0;
                  transform-origin: 0 0;
                }
              }

              & .device-content {
                border-radius: ${40 - (40 * 65) / 100}px;
                height: ${812 - (812 * 65) / 100}px;
                width: ${375 - (375 * 65) / 100}px;
              }

              & .device-stripe {
                &:after,
                &:before {
                  border: solid rgba(51, 51, 51, 0.25);
                  border-width: 0 ${7 - (7 * 65) / 100}px;
                  content: '';
                  height: ${7 - (7 * 65) / 100}px;
                  left: 0;
                  position: absolute;
                  width: 100%;
                  z-index: 9;
                }

                &:after {
                  top: ${85 - (85 * 65) / 100}px;
                }

                &:before {
                  bottom: ${85 - (85 * 65) / 100}px;
                }
              }

              & .device-header {
                background: #222;
                border-bottom-left-radius: ${20 -
                (20 * 65) / 100}px;
                border-bottom-right-radius: ${20 -
                (20 * 65) / 100}px;
                height: ${30 - (30 * 65) / 100}px;
                left: 50%;
                margin-left: ${-102 -
                (-102 * 65) / 100}px;
                position: absolute;
                top: ${28 - (28 * 65) / 100}px;
                width: ${204 - (204 * 65) / 100}px;

                &:after,
                &:before {
                  content: '';
                  height: ${10 - (10 * 65) / 100}px;
                  position: absolute;
                  top: 0;
                  width: ${10 - (10 * 65) / 100}px;
                }

                &:after {
                  background: radial-gradient(
                    circle at bottom left,
                    transparent 0,
                    transparent 75%,
                    #222 75%,
                    #222 100%
                  );
                  left: ${-10 - (-10 * 65) / 100}px;
                }

                &:before {
                  background: radial-gradient(
                    circle at bottom right,
                    transparent 0,
                    transparent 75%,
                    #222 75%,
                    #222 100%
                  );
                  right: ${-10 - (-10 * 65) / 100}px;
                }
              }

              & .device-sensors {
                &:after,
                &:before {
                  content: '';
                  position: absolute;
                }

                &:after {
                  background: #444;
                  border-radius: ${3 - (3 * 65) / 100}px;
                  height: ${6 - (6 * 65) / 100}px;
                  left: 50%;
                  margin-left: -25
                    ${180 - (180 * 65) / 100}px;
                  top: ${32 - (32 * 65) / 100}px;
                  width: ${50 - (50 * 65) / 100}px;
                }

                &:before {
                  background: #444;
                  border-radius: 50%;
                  height: ${14 - (14 * 65) / 100}px;
                  left: 50%;
                  margin-left: ${40 - (40 * 65) / 100}px;
                  top: ${28 - (28 * 65) / 100}px;
                  width: ${14 - (14 * 65) / 100}px;
                }
              }

              & .device-btns {
                background: #c8cacb;
                height: ${32 - (32 * 65) / 100}px;
                left: ${-3 - (-3 * 65) / 100}px;
                position: absolute;
                top: ${115 - (115 * 65) / 100}px;
                width: ${3 - (3 * 65) / 100}px;

                &:after,
                &:before {
                  background: #c8cacb;
                  content: '';
                  height: ${62 - (62 * 65) / 100}px;
                  left: 0;
                  position: absolute;
                  width: ${3 - (3 * 65) / 100}px;
                }

                &:after {
                  top: ${60 - (60 * 65) / 100}px;
                }

                &:before {
                  top: ${140 - (140 * 65) / 100}px;
                }
              }

              & .device-power {
                background: #c8cacb;
                height: ${100 - (100 * 65) / 100}px;
                position: absolute;
                right: ${-3 - (-3 * 65) / 100}px;
                top: ${200 - (200 * 65) / 100}px;
                width: ${3 - (3 * 65) / 100}px;
              }
            }
          }
        }
        @media (min-width: 961px) {
          & .device,
          & .device *,
          & .device :after,
          & .device :before,
          & .device :after,
          & .device :before {
            box-sizing: border-box;
            display: block;
          }

          & .device {
            position: relative;
            transform: scale(1);
            z-index: 1;

            & .device-frame {
              z-index: 1;
            }

            & .device-content {
              background-color: #fff;
              background-position: center center;
              background-size: cover;
              object-fit: cover;
              position: relative;
            }

            &.device-macbook-pro {
              height: ${444 - (444 * 50) / 100}px;
              width: ${740 - (740 * 50) / 100}px;
              margin: auto;
              border: 0;

              & .device-frame {
                background: #0d0d0d;
                border-radius: ${20 - (20 * 50) / 100}px;
                box-shadow: inset 0 0 0
                  ${2 - (2 * 50) / 100}px #c8cacb;
                height: ${428 - (428 * 50) / 100}px;
                margin: 0 auto;
                padding: ${29 - (29 * 50) / 100}px
                  ${19 - (19 * 50) / 100}px
                  ${39 - (39 * 50) / 100}px
                  ${19 - (19 * 50) / 100}px;
                position: relative;
                width: ${614 - (614 * 50) / 100}px;

                &:after {
                  background: #272626;
                  border-radius: 0 0
                    ${20 - (20 * 50) / 100}px
                    ${20 - (20 * 50) / 100}px;
                  bottom: ${2 - (2 * 50) / 100}px;
                  content: '';
                  height: ${26 - (26 * 50) / 100}px;
                  left: ${2 - (2 * 50) / 100}px;
                  position: absolute;
                  width: ${610 - (610 * 50) / 100}px;
                }

                &:before {
                  bottom: ${10 - (10 * 50) / 100}px;
                  color: #c8cacb;
                  content: '';
                  font-size: ${12 - (12 * 50) / 100}px;
                  height: ${16 - (16 * 50) / 100}px;
                  left: 50%;
                  line-height: ${16 - (16 * 50) / 100}px;
                  margin-left: ${-100 -
                  (-100 * 50) / 100}px;
                  position: absolute;
                  text-align: center;
                  width: ${200 - (200 * 50) / 100}px;
                  z-index: 1;
                }

                & iframe {
                  width: 1370px;
                  height: 857px;
                  border: 0;
                  -ms-transform: scale(0.21);
                  -moz-transform: scale(0.21);
                  -o-transform: scale(0.21);
                  -webkit-transform: scale(0.21);
                  transform: scale(0.21);
                  -ms-transform-origin: 0 0;
                  -moz-transform-origin: 0 0;
                  -o-transform-origin: 0 0;
                  -webkit-transform-origin: 0 0;
                  transform-origin: 0 0;
                }
              }

              & .device-content {
                border: ${2 - (2 * 50) / 100}px solid
                  #121212;
                border-radius: ${2 - (2 * 50) / 100}px;
                height: ${360 - (360 * 50) / 100}px;
                width: ${576 - (576 * 50) / 100}px;
              }

              & .device-power {
                background: #e2e3e4;
                border: solid #d5d6d8;
                border-radius: ${2 - (2 * 50) / 100}px
                  ${2 - (2 * 50) / 100}px 0 0;
                border-width: ${2 - (2 * 50) / 100}px
                  ${4 - (4 * 50) / 100}px 0
                  ${4 - (4 * 50) / 100}px;
                height: ${14 - (14 * 50) / 100}px;
                margin-top: ${-10 - (-10 * 50) / 100}px;
                position: relative;
                width: ${740 - (740 * 50) / 100}px;
                z-index: 9;

                &:after,
                &:before {
                  content: '';
                  position: absolute;
                }

                &:after {
                  background: #d5d6d8;
                  border-radius: 0 0
                    ${10 - (10 * 50) / 100}px
                    ${10 - (10 * 50) / 100}px;
                  box-shadow: inset 0 0
                    ${4 - (4 * 50) / 100}px
                    ${2 - (2 * 50) / 100}px #babdbf;
                  height: ${10 - (10 * 50) / 100}px;
                  left: 50%;
                  margin-left: ${-60 -
                  (-60 * 50) / 100}px;
                  top: ${-2 - (-2 * 50) / 100}px;
                  width: ${120 - (120 * 50) / 100}px;
                }

                &:before {
                  background: #a0a3a7;
                  border-radius: 0 0
                    ${180 - (180 * 50) / 100}px
                    ${180 - (180 * 50) / 100}px / 0 0
                    ${12 - (12 * 50) / 100}px
                    ${12 - (12 * 50) / 100}px;
                  box-shadow: inset 0
                    ${-2 - (-2 * 50) / 100}px
                    ${6 - (6 * 50) / 100}px 0 #474a4d;
                  height: ${12 - (12 * 50) / 100}px;
                  left: ${-4 - (-4 * 50) / 100}px;
                  margin: 0 auto;
                  top: ${10 - (10 * 50) / 100}px;
                  width: ${740 - (740 * 50) / 100}px;
                }
              }

              &.device-spacegray {
                & .device-frame {
                  box-shadow: inset 0 0 0 2px #767a7d;
                }

                & .device-power {
                  background: #909496;
                  border-color: #767a7d;

                  &:after {
                    background: #83878a;
                    box-shadow: inset 0 0 4px 2px #6a6d70;
                  }

                  &:before {
                    background: #515456;
                    box-shadow: inset 0 -2px 6px 0 #000;
                  }
                }
              }
            }

            &.device-ipad-pro {
              height: ${804 - (804 * 70) / 100}px;
              width: ${560 - (560 * 70) / 100}px;
              margin: auto;

              & .device-frame {
                background: #0d0d0d;
                border-radius: ${38 - (38 * 70) / 100}px;
                box-shadow: inset 0 0 0
                    ${2 - (2 * 70) / 100}px #c8cacb,
                  inset 0 0 0 ${6 - (6 * 70) / 100}px
                    #e2e3e4;
                height: ${804 - (804 * 70) / 100}px;
                padding: ${62 - (62 * 70) / 100}px
                  ${25 - (25 * 70) / 100}px;
                width: ${560 - (560 * 70) / 100}px;

                & iframe {
                  width: 507px;
                  height: 679px;
                  border: 0;
                  -ms-transform: scale(0.3);
                  -moz-transform: scale(0.3);
                  -o-transform: scale(0.3);
                  -webkit-transform: scale(0.3);
                  transform: scale(0.3);
                  -ms-transform-origin: 0 0;
                  -moz-transform-origin: 0 0;
                  -o-transform-origin: 0 0;
                  -webkit-transform-origin: 0 0;
                  transform-origin: 0 0;
                }
              }

              & .device-content {
                border: ${2 - (2 * 70) / 100}px solid #222;
                border-radius: ${2 - (2 * 70) / 100}px;
                height: ${680 - (680 * 70) / 100}px;
                width: ${510 - (510 * 70) / 100}px;
              }

              & .device-header {
                border: ${2 - (2 * 70) / 100}px solid
                  #c8cacb;
                border-radius: 50%;
                bottom: ${17 - (17 * 70) / 100}px;
                height: ${34 - (34 * 70) / 100}px;
                left: 50%;
                margin-left: ${-17 - (-17 * 70) / 100}px;
                position: absolute;
                width: ${34 - (34 * 70) / 100}px;
              }

              & .device-sensors {
                background: #666;
                border-radius: 50%;
                height: ${10 - (10 * 70) / 100}px;
                left: 50%;
                margin-left: ${-5 - (-5 * 70) / 100}px;
                margin-top: ${-5 - (-5 * 70) / 100}px;
                position: absolute;
                top: ${34 - (34 * 70) / 100}px;
                width: ${10 - (10 * 70) / 100}px;
              }

              &.device-gold {
                & .device-frame {
                  box-shadow: inset 0 0 0
                      ${2 - (2 * 70) / 100}px #e4b08a,
                    inset 0 0 0 ${6 - (6 * 70) / 100}px
                      #f7e8dd;
                }

                & .device-header {
                  border-color: #e4b08a;
                }
              }

              &.device-rosegold {
                & .device-frame {
                  box-shadow: inset 0 0 0
                      ${2 - (2 * 70) / 100}px #f6a69a,
                    inset 0 0 0 ${6 - (6 * 70) / 100}px
                      #facfc9;
                }

                & .device-header {
                  border-color: #f6a69a;
                }
              }

              &.device-spacegray {
                & .device-frame {
                  background: #222;
                  box-shadow: inset 0 0 0
                      ${2 - (2 * 70) / 100}px #818187,
                    inset 0 0 0 ${6 - (6 * 70) / 100}px
                      #9b9ba0;
                }

                & .device-header {
                  border-color: #818187;
                }
              }
            }

            &.device-iphone-x {
              height: ${868 - (868 * 75) / 100}px;
              width: ${428 - (428 * 75) / 100}px;
              margin: auto;

              & .device-frame {
                background: #222;
                border-radius: ${68 - (68 * 75) / 100}px;
                box-shadow: inset 0 0
                    ${2 - (2 * 75) / 100}px
                    ${2 - (2 * 75) / 100}px #c8cacb,
                  inset 0 0 0 ${7 - (7 * 75) / 100}px
                    #e2e3e4;
                height: ${868 - (868 * 75) / 100}px;
                padding: ${28 - (28 * 75) / 100}px;
                width: ${428 - (428 * 75) / 100}px;

                & iframe {
                  width: 372px;
                  height: 814px;
                  border: 0;
                  -ms-transform: scale(0.25);
                  -moz-transform: scale(0.25);
                  -o-transform: scale(0.25);
                  -webkit-transform: scale(0.25);
                  transform: scale(0.25);
                  -ms-transform-origin: 0 0;
                  -moz-transform-origin: 0 0;
                  -o-transform-origin: 0 0;
                  -webkit-transform-origin: 0 0;
                  transform-origin: 0 0;
                }
              }

              & .device-content {
                border-radius: ${40 - (40 * 75) / 100}px;
                height: ${812 - (812 * 75) / 100}px;
                width: ${375 - (375 * 75) / 100}px;
              }

              & .device-stripe {
                &:after,
                &:before {
                  border: solid rgba(51, 51, 51, 0.25);
                  border-width: 0 ${7 - (7 * 75) / 100}px;
                  content: '';
                  height: ${7 - (7 * 75) / 100}px;
                  left: 0;
                  position: absolute;
                  width: 100%;
                  z-index: 9;
                }

                &:after {
                  top: ${85 - (85 * 75) / 100}px;
                }

                &:before {
                  bottom: ${85 - (85 * 75) / 100}px;
                }
              }

              & .device-header {
                background: #222;
                border-bottom-left-radius: ${20 -
                (20 * 75) / 100}px;
                border-bottom-right-radius: ${20 -
                (20 * 75) / 100}px;
                height: ${30 - (30 * 75) / 100}px;
                left: 50%;
                margin-left: ${-102 -
                (-102 * 75) / 100}px;
                position: absolute;
                top: ${28 - (28 * 75) / 100}px;
                width: ${204 - (204 * 75) / 100}px;

                &:after,
                &:before {
                  content: '';
                  height: ${10 - (10 * 75) / 100}px;
                  position: absolute;
                  top: 0;
                  width: ${10 - (10 * 75) / 100}px;
                }

                &:after {
                  background: radial-gradient(
                    circle at bottom left,
                    transparent 0,
                    transparent 75%,
                    #222 75%,
                    #222 100%
                  );
                  left: ${-10 - (-10 * 75) / 100}px;
                }

                &:before {
                  background: radial-gradient(
                    circle at bottom right,
                    transparent 0,
                    transparent 75%,
                    #222 75%,
                    #222 100%
                  );
                  right: ${-10 - (-10 * 75) / 100}px;
                }
              }

              & .device-sensors {
                &:after,
                &:before {
                  content: '';
                  position: absolute;
                }

                &:after {
                  background: #444;
                  border-radius: ${3 - (3 * 75) / 100}px;
                  height: ${6 - (6 * 75) / 100}px;
                  left: 50%;
                  margin-left: -25
                    ${180 - (180 * 75) / 100}px;
                  top: ${32 - (32 * 75) / 100}px;
                  width: ${50 - (50 * 75) / 100}px;
                }

                &:before {
                  background: #444;
                  border-radius: 50%;
                  height: ${14 - (14 * 75) / 100}px;
                  left: 50%;
                  margin-left: ${40 - (40 * 75) / 100}px;
                  top: ${28 - (28 * 75) / 100}px;
                  width: ${14 - (14 * 75) / 100}px;
                }
              }

              & .device-btns {
                background: #c8cacb;
                height: ${32 - (32 * 75) / 100}px;
                left: ${-3 - (-3 * 75) / 100}px;
                position: absolute;
                top: ${115 - (115 * 75) / 100}px;
                width: ${3 - (3 * 75) / 100}px;

                &:after,
                &:before {
                  background: #c8cacb;
                  content: '';
                  height: ${62 - (62 * 75) / 100}px;
                  left: 0;
                  position: absolute;
                  width: ${3 - (3 * 75) / 100}px;
                }

                &:after {
                  top: ${60 - (60 * 75) / 100}px;
                }

                &:before {
                  top: ${140 - (140 * 75) / 100}px;
                }
              }

              & .device-power {
                background: #c8cacb;
                height: ${100 - (100 * 75) / 100}px;
                position: absolute;
                right: ${-3 - (-3 * 75) / 100}px;
                top: ${200 - (200 * 75) / 100}px;
                width: ${3 - (3 * 75) / 100}px;
              }
            }
          }
        }
        @media (min-width: 1025px) {
          & .device,
          & .device *,
          & .device :after,
          & .device :before,
          & .device :after,
          & .device :before {
            box-sizing: border-box;
            display: block;
          }

          & .device {
            position: relative;
            transform: scale(1);
            z-index: 1;

            & .device-frame {
              z-index: 1;
            }

            & .device-content {
              background-color: #fff;
              background-position: center center;
              background-size: cover;
              object-fit: cover;
              position: relative;
            }

            &.device-macbook-pro {
              height: ${444 - (444 * 50) / 100}px;
              width: ${740 - (740 * 50) / 100}px;
              margin: auto;
              border: 0;

              & .device-frame {
                background: #0d0d0d;
                border-radius: ${20 - (20 * 50) / 100}px;
                box-shadow: inset 0 0 0
                  ${2 - (2 * 50) / 100}px #c8cacb;
                height: ${428 - (428 * 50) / 100}px;
                margin: 0 auto;
                padding: ${29 - (29 * 50) / 100}px
                  ${19 - (19 * 50) / 100}px
                  ${39 - (39 * 50) / 100}px
                  ${19 - (19 * 50) / 100}px;
                position: relative;
                width: ${614 - (614 * 50) / 100}px;

                &:after {
                  background: #272626;
                  border-radius: 0 0
                    ${20 - (20 * 50) / 100}px
                    ${20 - (20 * 50) / 100}px;
                  bottom: ${2 - (2 * 50) / 100}px;
                  content: '';
                  height: ${26 - (26 * 50) / 100}px;
                  left: ${2 - (2 * 50) / 100}px;
                  position: absolute;
                  width: ${610 - (610 * 50) / 100}px;
                }

                &:before {
                  bottom: ${10 - (10 * 50) / 100}px;
                  color: #c8cacb;
                  content: '';
                  font-size: ${12 - (12 * 50) / 100}px;
                  height: ${16 - (16 * 50) / 100}px;
                  left: 50%;
                  line-height: ${16 - (16 * 50) / 100}px;
                  margin-left: ${-100 -
                  (-100 * 50) / 100}px;
                  position: absolute;
                  text-align: center;
                  width: ${200 - (200 * 50) / 100}px;
                  z-index: 1;
                }

                & iframe {
                  width: ${1434 - (1434 * 50) / 100}px;
                  height: ${895 - (895 * 50) / 100}px;
                  border: 0;
                  -ms-transform: scale(0.4);
                  -moz-transform: scale(0.4);
                  -o-transform: scale(0.4);
                  -webkit-transform: scale(0.4);
                  transform: scale(0.4);
                  -ms-transform-origin: 0 0;
                  -moz-transform-origin: 0 0;
                  -o-transform-origin: 0 0;
                  -webkit-transform-origin: 0 0;
                  transform-origin: 0 0;
                }
              }

              & .device-content {
                border: ${2 - (2 * 50) / 100}px solid
                  #121212;
                border-radius: ${2 - (2 * 50) / 100}px;
                height: ${360 - (360 * 50) / 100}px;
                width: ${576 - (576 * 50) / 100}px;
              }

              & .device-power {
                background: #e2e3e4;
                border: solid #d5d6d8;
                border-radius: ${2 - (2 * 50) / 100}px
                  ${2 - (2 * 50) / 100}px 0 0;
                border-width: ${2 - (2 * 50) / 100}px
                  ${4 - (4 * 50) / 100}px 0
                  ${4 - (4 * 50) / 100}px;
                height: ${14 - (14 * 50) / 100}px;
                margin-top: ${-10 - (-10 * 50) / 100}px;
                position: relative;
                width: ${740 - (740 * 50) / 100}px;
                z-index: 9;

                &:after,
                &:before {
                  content: '';
                  position: absolute;
                }

                &:after {
                  background: #d5d6d8;
                  border-radius: 0 0
                    ${10 - (10 * 50) / 100}px
                    ${10 - (10 * 50) / 100}px;
                  box-shadow: inset 0 0
                    ${4 - (4 * 50) / 100}px
                    ${2 - (2 * 50) / 100}px #babdbf;
                  height: ${10 - (10 * 50) / 100}px;
                  left: 50%;
                  margin-left: ${-60 -
                  (-60 * 50) / 100}px;
                  top: ${-2 - (-2 * 50) / 100}px;
                  width: ${120 - (120 * 50) / 100}px;
                }

                &:before {
                  background: #a0a3a7;
                  border-radius: 0 0
                    ${180 - (180 * 50) / 100}px
                    ${180 - (180 * 50) / 100}px / 0 0
                    ${12 - (12 * 50) / 100}px
                    ${12 - (12 * 50) / 100}px;
                  box-shadow: inset 0
                    ${-2 - (-2 * 50) / 100}px
                    ${6 - (6 * 50) / 100}px 0 #474a4d;
                  height: ${12 - (12 * 50) / 100}px;
                  left: ${-4 - (-4 * 50) / 100}px;
                  margin: 0 auto;
                  top: ${10 - (10 * 50) / 100}px;
                  width: ${740 - (740 * 50) / 100}px;
                }
              }

              &.device-spacegray {
                & .device-frame {
                  box-shadow: inset 0 0 0 2px #767a7d;
                }

                & .device-power {
                  background: #909496;
                  border-color: #767a7d;

                  &:after {
                    background: #83878a;
                    box-shadow: inset 0 0 4px 2px #6a6d70;
                  }

                  &:before {
                    background: #515456;
                    box-shadow: inset 0 -2px 6px 0 #000;
                  }
                }
              }
            }

            &.device-ipad-pro {
              height: ${804 - (804 * 50) / 100}px;
              width: ${560 - (560 * 50) / 100}px;
              margin: auto;

              & .device-frame {
                background: #0d0d0d;
                border-radius: ${38 - (38 * 50) / 100}px;
                box-shadow: inset 0 0 0
                    ${2 - (2 * 50) / 100}px #c8cacb,
                  inset 0 0 0 ${6 - (6 * 50) / 100}px
                    #e2e3e4;
                height: ${804 - (804 * 50) / 100}px;
                padding: ${62 - (62 * 50) / 100}px
                  ${25 - (25 * 50) / 100}px;
                width: ${560 - (560 * 50) / 100}px;

                & iframe {
                  width: ${848 - (848 * 50) / 100}px;
                  height: ${1132 - (1132 * 50) / 100}px;
                  border: 0;
                  -ms-transform: scale(0.6);
                  -moz-transform: scale(0.6);
                  -o-transform: scale(0.6);
                  -webkit-transform: scale(0.6);
                  transform: scale(0.6);
                  -ms-transform-origin: 0 0;
                  -moz-transform-origin: 0 0;
                  -o-transform-origin: 0 0;
                  -webkit-transform-origin: 0 0;
                  transform-origin: 0 0;
                }
              }

              & .device-content {
                border: ${2 - (2 * 50) / 100}px solid #222;
                border-radius: ${2 - (2 * 50) / 100}px;
                height: ${680 - (680 * 50) / 100}px;
                width: ${510 - (510 * 50) / 100}px;
              }

              & .device-header {
                border: ${2 - (2 * 50) / 100}px solid
                  #c8cacb;
                border-radius: 50%;
                bottom: ${17 - (17 * 50) / 100}px;
                height: ${34 - (34 * 50) / 100}px;
                left: 50%;
                margin-left: ${-17 - (-17 * 50) / 100}px;
                position: absolute;
                width: ${34 - (34 * 50) / 100}px;
              }

              & .device-sensors {
                background: #666;
                border-radius: 50%;
                height: ${10 - (10 * 50) / 100}px;
                left: 50%;
                margin-left: ${-5 - (-5 * 50) / 100}px;
                margin-top: ${-5 - (-5 * 50) / 100}px;
                position: absolute;
                top: ${34 - (34 * 50) / 100}px;
                width: ${10 - (10 * 50) / 100}px;
              }

              &.device-gold {
                & .device-frame {
                  box-shadow: inset 0 0 0
                      ${2 - (2 * 50) / 100}px #e4b08a,
                    inset 0 0 0 ${6 - (6 * 50) / 100}px
                      #f7e8dd;
                }

                & .device-header {
                  border-color: #e4b08a;
                }
              }

              &.device-rosegold {
                & .device-frame {
                  box-shadow: inset 0 0 0
                      ${2 - (2 * 50) / 100}px #f6a69a,
                    inset 0 0 0 ${6 - (6 * 50) / 100}px
                      #facfc9;
                }

                & .device-header {
                  border-color: #f6a69a;
                }
              }

              &.device-spacegray {
                & .device-frame {
                  background: #222;
                  box-shadow: inset 0 0 0
                      ${2 - (2 * 50) / 100}px #818187,
                    inset 0 0 0 ${6 - (6 * 50) / 100}px
                      #9b9ba0;
                }

                & .device-header {
                  border-color: #818187;
                }
              }
            }

            &.device-iphone-x {
              height: ${868 - (868 * 50) / 100}px;
              width: ${428 - (428 * 50) / 100}px;
              margin: auto;

              & .device-frame {
                background: #222;
                border-radius: ${68 - (68 * 50) / 100}px;
                box-shadow: inset 0 0
                    ${2 - (2 * 50) / 100}px
                    ${2 - (2 * 50) / 100}px #c8cacb,
                  inset 0 0 0 ${7 - (7 * 50) / 100}px
                    #e2e3e4;
                height: ${868 - (868 * 50) / 100}px;
                padding: ${28 - (28 * 50) / 100}px;
                width: ${428 - (428 * 50) / 100}px;

                & iframe {
                  width: 265px;
                  height: 580px;
                  border: 0;
                  -ms-transform: scale(0.7);
                  -moz-transform: scale(0.7);
                  -o-transform: scale(0.7);
                  -webkit-transform: scale(0.7);
                  transform: scale(0.7);
                  -ms-transform-origin: 0 0;
                  -moz-transform-origin: 0 0;
                  -o-transform-origin: 0 0;
                  -webkit-transform-origin: 0 0;
                  transform-origin: 0 0;
                }
              }

              & .device-content {
                border-radius: ${40 - (40 * 50) / 100}px;
                height: ${812 - (812 * 50) / 100}px;
                width: ${375 - (375 * 50) / 100}px;
              }

              & .device-stripe {
                &:after,
                &:before {
                  border: solid rgba(51, 51, 51, 0.25);
                  border-width: 0 ${7 - (7 * 50) / 100}px;
                  content: '';
                  height: ${7 - (7 * 50) / 100}px;
                  left: 0;
                  position: absolute;
                  width: 100%;
                  z-index: 9;
                }

                &:after {
                  top: ${85 - (85 * 50) / 100}px;
                }

                &:before {
                  bottom: ${85 - (85 * 50) / 100}px;
                }
              }

              & .device-header {
                background: #222;
                border-bottom-left-radius: ${20 -
                (20 * 50) / 100}px;
                border-bottom-right-radius: ${20 -
                (20 * 50) / 100}px;
                height: ${30 - (30 * 50) / 100}px;
                left: 50%;
                margin-left: ${-102 -
                (-102 * 50) / 100}px;
                position: absolute;
                top: ${28 - (28 * 50) / 100}px;
                width: ${204 - (204 * 50) / 100}px;

                &:after,
                &:before {
                  content: '';
                  height: ${10 - (10 * 50) / 100}px;
                  position: absolute;
                  top: 0;
                  width: ${10 - (10 * 50) / 100}px;
                }

                &:after {
                  background: radial-gradient(
                    circle at bottom left,
                    transparent 0,
                    transparent 75%,
                    #222 75%,
                    #222 100%
                  );
                  left: ${-10 - (-10 * 50) / 100}px;
                }

                &:before {
                  background: radial-gradient(
                    circle at bottom right,
                    transparent 0,
                    transparent 75%,
                    #222 75%,
                    #222 100%
                  );
                  right: ${-10 - (-10 * 50) / 100}px;
                }
              }

              & .device-sensors {
                &:after,
                &:before {
                  content: '';
                  position: absolute;
                }

                &:after {
                  background: #444;
                  border-radius: ${3 - (3 * 50) / 100}px;
                  height: ${6 - (6 * 50) / 100}px;
                  left: 50%;
                  margin-left: -25
                    ${180 - (180 * 50) / 100}px;
                  top: ${32 - (32 * 50) / 100}px;
                  width: ${50 - (50 * 50) / 100}px;
                }

                &:before {
                  background: #444;
                  border-radius: 50%;
                  height: ${14 - (14 * 50) / 100}px;
                  left: 50%;
                  margin-left: ${40 - (40 * 50) / 100}px;
                  top: ${28 - (28 * 50) / 100}px;
                  width: ${14 - (14 * 50) / 100}px;
                }
              }

              & .device-btns {
                background: #c8cacb;
                height: ${32 - (32 * 50) / 100}px;
                left: ${-3 - (-3 * 50) / 100}px;
                position: absolute;
                top: ${115 - (115 * 50) / 100}px;
                width: ${3 - (3 * 50) / 100}px;

                &:after,
                &:before {
                  background: #c8cacb;
                  content: '';
                  height: ${62 - (62 * 50) / 100}px;
                  left: 0;
                  position: absolute;
                  width: ${3 - (3 * 50) / 100}px;
                }

                &:after {
                  top: ${60 - (60 * 50) / 100}px;
                }

                &:before {
                  top: ${140 - (140 * 50) / 100}px;
                }
              }

              & .device-power {
                background: #c8cacb;
                height: ${100 - (100 * 50) / 100}px;
                position: absolute;
                right: ${-3 - (-3 * 50) / 100}px;
                top: ${200 - (200 * 50) / 100}px;
                width: ${3 - (3 * 50) / 100}px;
              }
            }
          }
        }

        @media (min-width: 1281px) {
          & .device,
          & .device *,
          & .device :after,
          & .device :before,
          & .device :after,
          & .device :before {
            box-sizing: border-box;
            display: block;
          }

          & .device {
            position: relative;
            transform: scale(1);
            z-index: 1;

            & .device-frame {
              z-index: 1;
            }

            & .device-content {
              background-color: #fff;
              background-position: center center;
              background-size: cover;
              object-fit: cover;
              position: relative;
            }

            &.device-macbook-pro {
              height: ${444 - (444 * 18) / 100}px;
              width: ${740 - (740 * 18) / 100}px;
              margin: auto;
              border: 0;

              & .device-frame {
                background: #0d0d0d;
                border-radius: ${20 - (20 * 18) / 100}px;
                box-shadow: inset 0 0 0
                  ${2 - (2 * 18) / 100}px #c8cacb;
                height: ${428 - (428 * 18) / 100}px;
                margin: 0 auto;
                padding: ${29 - (29 * 18) / 100}px
                  ${19 - (19 * 18) / 100}px
                  ${39 - (39 * 18) / 100}px
                  ${19 - (19 * 18) / 100}px;
                position: relative;
                width: ${614 - (614 * 18) / 100}px;

                &:after {
                  background: #272626;
                  border-radius: 0 0
                    ${20 - (20 * 18) / 100}px
                    ${20 - (20 * 18) / 100}px;
                  bottom: ${2 - (2 * 18) / 100}px;
                  content: '';
                  height: ${26 - (26 * 18) / 100}px;
                  left: ${2 - (2 * 18) / 100}px;
                  position: absolute;
                  width: ${610 - (610 * 18) / 100}px;
                }

                &:before {
                  bottom: ${10 - (10 * 18) / 100}px;
                  color: #c8cacb;
                  content: '';
                  font-size: ${12 - (12 * 18) / 100}px;
                  height: ${16 - (16 * 18) / 100}px;
                  left: 50%;
                  line-height: ${16 - (16 * 18) / 100}px;
                  margin-left: ${-100 -
                  (-100 * 18) / 100}px;
                  position: absolute;
                  text-align: center;
                  width: ${200 - (200 * 18) / 100}px;
                  z-index: 1;
                }

                & iframe {
                  width: ${1434 - (1434 * 18) / 100}px;
                  height: ${895 - (895 * 18) / 100}px;
                  border: 0;
                  -ms-transform: scale(0.4);
                  -moz-transform: scale(0.4);
                  -o-transform: scale(0.4);
                  -webkit-transform: scale(0.4);
                  transform: scale(0.4);
                  -ms-transform-origin: 0 0;
                  -moz-transform-origin: 0 0;
                  -o-transform-origin: 0 0;
                  -webkit-transform-origin: 0 0;
                  transform-origin: 0 0;
                }
              }

              & .device-content {
                border: ${2 - (2 * 18) / 100}px solid
                  #121212;
                border-radius: ${2 - (2 * 18) / 100}px;
                height: ${360 - (360 * 18) / 100}px;
                width: ${576 - (576 * 18) / 100}px;
              }

              & .device-power {
                background: #e2e3e4;
                border: solid #d5d6d8;
                border-radius: ${2 - (2 * 18) / 100}px
                  ${2 - (2 * 18) / 100}px 0 0;
                border-width: ${2 - (2 * 18) / 100}px
                  ${4 - (4 * 18) / 100}px 0
                  ${4 - (4 * 18) / 100}px;
                height: ${14 - (14 * 18) / 100}px;
                margin-top: ${-10 - (-10 * 18) / 100}px;
                position: relative;
                width: ${740 - (740 * 18) / 100}px;
                z-index: 9;

                &:after,
                &:before {
                  content: '';
                  position: absolute;
                }

                &:after {
                  background: #d5d6d8;
                  border-radius: 0 0
                    ${10 - (10 * 18) / 100}px
                    ${10 - (10 * 18) / 100}px;
                  box-shadow: inset 0 0
                    ${4 - (4 * 18) / 100}px
                    ${2 - (2 * 18) / 100}px #babdbf;
                  height: ${10 - (10 * 18) / 100}px;
                  left: 50%;
                  margin-left: ${-60 -
                  (-60 * 18) / 100}px;
                  top: ${-2 - (-2 * 18) / 100}px;
                  width: ${120 - (120 * 18) / 100}px;
                }

                &:before {
                  background: #a0a3a7;
                  border-radius: 0 0
                    ${180 - (180 * 18) / 100}px
                    ${180 - (180 * 18) / 100}px / 0 0
                    ${12 - (12 * 18) / 100}px
                    ${12 - (12 * 18) / 100}px;
                  box-shadow: inset 0
                    ${-2 - (-2 * 18) / 100}px
                    ${6 - (6 * 18) / 100}px 0 #474a4d;
                  height: ${12 - (12 * 18) / 100}px;
                  left: ${-4 - (-4 * 18) / 100}px;
                  margin: 0 auto;
                  top: ${10 - (10 * 18) / 100}px;
                  width: ${740 - (740 * 18) / 100}px;
                }
              }
            }

            &.device-ipad-pro {
              height: ${804 - (804 * 55) / 100}px;
              width: ${560 - (560 * 55) / 100}px;
              margin: auto;

              & .device-frame {
                background: #0d0d0d;
                border-radius: ${38 - (38 * 55) / 100}px;
                box-shadow: inset 0 0 0
                    ${2 - (2 * 55) / 100}px #c8cacb,
                  inset 0 0 0 ${6 - (6 * 55) / 100}px
                    #e2e3e4;
                height: ${804 - (804 * 55) / 100}px;
                padding: ${62 - (62 * 55) / 100}px
                  ${25 - (25 * 55) / 100}px;
                width: ${560 - (560 * 55) / 100}px;

                & iframe {
                  width: 456.6px;
                  height: 611.4px;
                  border: 0;
                  -ms-transform: scale(0.5);
                  -moz-transform: scale(0.5);
                  -o-transform: scale(0.5);
                  -webkit-transform: scale(0.5);
                  transform: scale(0.5);
                  -ms-transform-origin: 0 0;
                  -moz-transform-origin: 0 0;
                  -o-transform-origin: 0 0;
                  -webkit-transform-origin: 0 0;
                  transform-origin: 0 0;
                }
              }

              & .device-content {
                border: ${2 - (2 * 55) / 100}px solid #222;
                border-radius: ${2 - (2 * 55) / 100}px;
                height: ${680 - (680 * 55) / 100}px;
                width: ${510 - (510 * 55) / 100}px;
              }

              & .device-header {
                border: ${2 - (2 * 55) / 100}px solid
                  #c8cacb;
                border-radius: 50%;
                bottom: ${17 - (17 * 55) / 100}px;
                height: ${34 - (34 * 55) / 100}px;
                left: 50%;
                margin-left: ${-17 - (-17 * 55) / 100}px;
                position: absolute;
                width: ${34 - (34 * 55) / 100}px;
              }

              & .device-sensors {
                background: #666;
                border-radius: 50%;
                height: ${10 - (10 * 55) / 100}px;
                left: 50%;
                margin-left: ${-5 - (-5 * 55) / 100}px;
                margin-top: ${-5 - (-5 * 55) / 100}px;
                position: absolute;
                top: ${34 - (34 * 55) / 100}px;
                width: ${10 - (10 * 55) / 100}px;
              }

              &.device-gold {
                & .device-frame {
                  box-shadow: inset 0 0 0
                      ${2 - (2 * 55) / 100}px #e4b08a,
                    inset 0 0 0 ${6 - (6 * 55) / 100}px
                      #f7e8dd;
                }

                & .device-header {
                  border-color: #e4b08a;
                }
              }

              &.device-rosegold {
                & .device-frame {
                  box-shadow: inset 0 0 0
                      ${2 - (2 * 55) / 100}px #f6a69a,
                    inset 0 0 0 ${6 - (6 * 55) / 100}px
                      #facfc9;
                }

                & .device-header {
                  border-color: #f6a69a;
                }
              }

              &.device-spacegray {
                & .device-frame {
                  background: #222;
                  box-shadow: inset 0 0 0
                      ${2 - (2 * 55) / 100}px #818187,
                    inset 0 0 0 ${6 - (6 * 55) / 100}px
                      #9b9ba0;
                }

                & .device-header {
                  border-color: #818187;
                }
              }
            }

            &.device-iphone-x {
              height: ${868 - (868 * 65) / 100}px;
              width: ${428 - (428 * 65) / 100}px;
              margin: auto;

              & .device-frame {
                background: #222;
                border-radius: ${68 - (68 * 65) / 100}px;
                box-shadow: inset 0 0
                    ${2 - (2 * 65) / 100}px
                    ${2 - (2 * 65) / 100}px #c8cacb,
                  inset 0 0 0 ${7 - (7 * 65) / 100}px
                    #e2e3e4;
                height: ${868 - (868 * 65) / 100}px;
                padding: ${28 - (28 * 65) / 100}px;
                width: ${428 - (428 * 65) / 100}px;

                & iframe {
                  width: 432px;
                  height: 944px;
                  border: 0;
                  -ms-transform: scale(0.3);
                  -moz-transform: scale(0.3);
                  -o-transform: scale(0.3);
                  -webkit-transform: scale(0.3);
                  transform: scale(0.3);
                  -ms-transform-origin: 0 0;
                  -moz-transform-origin: 0 0;
                  -o-transform-origin: 0 0;
                  -webkit-transform-origin: 0 0;
                  transform-origin: 0 0;
                }
              }

              & .device-content {
                border-radius: ${40 - (40 * 65) / 100}px;
                height: ${812 - (812 * 65) / 100}px;
                width: ${375 - (375 * 65) / 100}px;
              }

              & .device-stripe {
                &:after,
                &:before {
                  border: solid rgba(51, 51, 51, 0.25);
                  border-width: 0 ${7 - (7 * 65) / 100}px;
                  content: '';
                  height: ${7 - (7 * 65) / 100}px;
                  left: 0;
                  position: absolute;
                  width: 100%;
                  z-index: 9;
                }

                &:after {
                  top: ${85 - (85 * 65) / 100}px;
                }

                &:before {
                  bottom: ${85 - (85 * 65) / 100}px;
                }
              }

              & .device-header {
                background: #222;
                border-bottom-left-radius: ${20 -
                (20 * 65) / 100}px;
                border-bottom-right-radius: ${20 -
                (20 * 65) / 100}px;
                height: ${30 - (30 * 65) / 100}px;
                left: 50%;
                margin-left: ${-102 -
                (-102 * 65) / 100}px;
                position: absolute;
                top: ${28 - (28 * 65) / 100}px;
                width: ${204 - (204 * 65) / 100}px;

                &:after,
                &:before {
                  content: '';
                  height: ${10 - (10 * 65) / 100}px;
                  position: absolute;
                  top: 0;
                  width: ${10 - (10 * 65) / 100}px;
                }

                &:after {
                  background: radial-gradient(
                    circle at bottom left,
                    transparent 0,
                    transparent 75%,
                    #222 75%,
                    #222 100%
                  );
                  left: ${-10 - (-10 * 65) / 100}px;
                }

                &:before {
                  background: radial-gradient(
                    circle at bottom right,
                    transparent 0,
                    transparent 75%,
                    #222 75%,
                    #222 100%
                  );
                  right: ${-10 - (-10 * 65) / 100}px;
                }
              }

              & .device-sensors {
                &:after,
                &:before {
                  content: '';
                  position: absolute;
                }

                &:after {
                  background: #444;
                  border-radius: ${3 - (3 * 65) / 100}px;
                  height: ${6 - (6 * 65) / 100}px;
                  left: 50%;
                  margin-left: -25
                    ${180 - (180 * 65) / 100}px;
                  top: ${32 - (32 * 65) / 100}px;
                  width: ${50 - (50 * 65) / 100}px;
                }

                &:before {
                  background: #444;
                  border-radius: 50%;
                  height: ${14 - (14 * 65) / 100}px;
                  left: 50%;
                  margin-left: ${40 - (40 * 65) / 100}px;
                  top: ${28 - (28 * 65) / 100}px;
                  width: ${14 - (14 * 65) / 100}px;
                }
              }

              & .device-btns {
                background: #c8cacb;
                height: ${32 - (32 * 65) / 100}px;
                left: ${-3 - (-3 * 65) / 100}px;
                position: absolute;
                top: ${115 - (115 * 65) / 100}px;
                width: ${3 - (3 * 65) / 100}px;

                &:after,
                &:before {
                  background: #c8cacb;
                  content: '';
                  height: ${62 - (62 * 65) / 100}px;
                  left: 0;
                  position: absolute;
                  width: ${3 - (3 * 65) / 100}px;
                }

                &:after {
                  top: ${60 - (60 * 65) / 100}px;
                }

                &:before {
                  top: ${140 - (140 * 65) / 100}px;
                }
              }

              & .device-power {
                background: #c8cacb;
                height: ${100 - (100 * 65) / 100}px;
                position: absolute;
                right: ${-3 - (-3 * 65) / 100}px;
                top: ${200 - (200 * 65) / 100}px;
                width: ${3 - (3 * 65) / 100}px;
              }
            }
          }
        }
      `}
    >
      {children}
    </div>
  );
};
