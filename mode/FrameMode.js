// Written by Jürgen Moßgraber - mossgrabers.de
//            Michael Schmalle - teotigraphix.com
// (c) 2014
// Licensed under LGPLv3 - http://www.gnu.org/licenses/lgpl-3.0.txt

FrameMode.ROW0 = '-------- Layouts -------- ------------------ Panels-----------------';
FrameMode.ROW1 = 'Arrange    Mix     Edit   NoteEditAutomate  Device  Mixer     Full  ';
FrameMode.ROW2 = '-------- Arranger-------- ------------------ Mixer------------------';
FrameMode.ROW3 = 'Markers   Follow TrckHght ClpLnchrCrossFde    FX     I/O     Meters ';
FrameMode.BUTTON_COLOR_OFF  = PUSH_COLOR_GREEN_LO;
FrameMode.BUTTON_COLOR_ON   = PUSH_COLOR_YELLOW_MD;
FrameMode.BUTTON_COLOR2_OFF = PUSH_COLOR2_GREEN_LO;
FrameMode.BUTTON_COLOR2_ON  = PUSH_COLOR2_YELLOW_HI;


function FrameMode (model)
{
    BaseMode.call (this, model);
    this.id = MODE_FRAME;
    this.bottomItems = [];
}
FrameMode.prototype = new BaseMode ();

FrameMode.prototype.onFirstRow = function (index) 
{
    var app = this.model.getApplication ();
    switch (index)
    {
        case 0: app.setPanelLayout ('ARRANGE'); break;
        case 1: app.setPanelLayout ('MIX'); break;
        case 2: app.setPanelLayout ('EDIT'); break;
        case 3: app.toggleNoteEditor (); break;
        case 4: app.toggleAutomationEditor (); break;
        case 5: app.toggleDevices (); break;
        case 6: app.toggleMixer (); break;
        case 7: app.toggleFullScreen (); break;
    }
};

FrameMode.prototype.onSecondRow = function (index)
{
    var arrange = this.model.getArranger ();
    var mix = this.model.getMixer ();
    switch (index)
    {
        case 0: arrange.toggleCueMarkerVisibility (); break;
        case 1: arrange.togglePlaybackFollow (); break;
        case 2: arrange.toggleTrackRowHeight (); break;
        case 3: mix.toggleClipLauncherSectionVisibility (); break;
        case 4: mix.toggleCrossFadeSectionVisibility (); break;
        case 5:
            var toggleBoth = mix.isDeviceSectionVisible () == mix.isSendSectionVisible ();
            mix.toggleDeviceSectionVisibility ();
            if (toggleBoth)
                mix.toggleSendsSectionVisibility (); 
            break;
        case 6: mix.toggleIoSectionVisibility (); break;
        case 7: mix.toggleMeterSectionVisibility (); break;
    }
};

FrameMode.prototype.updateDisplay = function () 
{
    this.surface.getDisplay ().setRow (0, FrameMode.ROW0).setRow (1, FrameMode.ROW1).setRow (2, FrameMode.ROW2).setRow (3, FrameMode.ROW3);
};

FrameMode.prototype.updateFirstRow = function ()
{
    var app = this.model.getApplication ();
    var layout = app.getPanelLayout ();
    this.surface.setButton (20, layout == 'ARRANGE' ? FrameMode.BUTTON_COLOR_ON : FrameMode.BUTTON_COLOR_OFF);
    this.surface.setButton (21, layout == 'MIX' ? FrameMode.BUTTON_COLOR_ON : FrameMode.BUTTON_COLOR_OFF);
    this.surface.setButton (22, layout == 'EDIT' ? FrameMode.BUTTON_COLOR_ON : FrameMode.BUTTON_COLOR_OFF);
    this.surface.setButton (23, FrameMode.BUTTON_COLOR_OFF);
    this.surface.setButton (24, FrameMode.BUTTON_COLOR_OFF);
    this.surface.setButton (25, FrameMode.BUTTON_COLOR_OFF);
    this.surface.setButton (26, FrameMode.BUTTON_COLOR_OFF);
    this.surface.setButton (27, FrameMode.BUTTON_COLOR_OFF);
};

FrameMode.prototype.updateSecondRow = function ()
{
    var arrange = this.model.getArranger ();
    var mix = this.model.getMixer ();
    this.surface.setButton (102, arrange.areCueMarkersVisible () ? FrameMode.BUTTON_COLOR2_ON : FrameMode.BUTTON_COLOR2_OFF);
    this.surface.setButton (103, arrange.isPlaybackFollowEnabled () ? FrameMode.BUTTON_COLOR2_ON : FrameMode.BUTTON_COLOR2_OFF);
    this.surface.setButton (104, arrange.hasDoubleRowTrackHeight () ? FrameMode.BUTTON_COLOR2_ON : FrameMode.BUTTON_COLOR2_OFF);
    this.surface.setButton (105, mix.isClipLauncherSectionVisible () ? FrameMode.BUTTON_COLOR2_ON : FrameMode.BUTTON_COLOR2_OFF);
    this.surface.setButton (106, mix.isCrossFadeSectionVisible () ? FrameMode.BUTTON_COLOR2_ON : FrameMode.BUTTON_COLOR2_OFF);
    this.surface.setButton (107, mix.isDeviceSectionVisible () ? FrameMode.BUTTON_COLOR2_ON : FrameMode.BUTTON_COLOR2_OFF);
    this.surface.setButton (108, mix.isIoSectionVisible () ? FrameMode.BUTTON_COLOR2_ON : FrameMode.BUTTON_COLOR2_OFF);
    this.surface.setButton (109, mix.isMeterSectionVisible () ? FrameMode.BUTTON_COLOR2_ON : FrameMode.BUTTON_COLOR2_OFF);
};
