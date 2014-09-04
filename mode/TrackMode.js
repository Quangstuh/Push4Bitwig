// Written by Jürgen Moßgraber - mossgrabers.de
//            Michael Schmalle - teotigraphix.com
// (c) 2014
// Licensed under LGPLv3 - http://www.gnu.org/licenses/lgpl-3.0.txt

function TrackMode (model)
{
    AbstractTrackMode.call (this, model);
    this.id = MODE_TRACK;
}
TrackMode.prototype = new AbstractTrackMode ();

TrackMode.prototype.onValueKnob = function (index, value)
{
    var tb = this.model.getCurrentTrackBank ();
    var selectedTrack = tb.getSelectedTrack ();
    if (selectedTrack == null)
        return;
    if (index == 0)
        tb.changeVolume (selectedTrack.index, value, this.surface.getFractionValue ());
    else if (index == 1)
        tb.changePan (selectedTrack.index, value, this.surface.getFractionValue ());
    else
        tb.changeSend (selectedTrack.index, index - 2, value, this.surface.getFractionValue ());
};

TrackMode.prototype.updateDisplay = function ()
{
    var currentTrackBank = this.model.getCurrentTrackBank ();
    var t = currentTrackBank.getSelectedTrack ();
    var d = this.surface.getDisplay ();
    
    if (t == null)
        d.setRow (1, "                     Please selecta track...                        ")
         .clearRow (0).clearRow (2).done (0).done (2);
    else
    {
        d.setCell (0, 0, "Volume", Display.FORMAT_RAW)
         .setCell (1, 0, t.volumeStr, Display.FORMAT_RAW)
         .setCell (2, 0, this.surface.showVU ? t.vu : t.volume, Display.FORMAT_VALUE)
         .setCell (0, 1, "Pan", Display.FORMAT_RAW)
         .setCell (1, 1, t.panStr, Display.FORMAT_RAW)
         .setCell (2, 1, t.pan, Display.FORMAT_PAN);

        var fxTrackBank = this.model.getEffectTrackBank ();
        if (fxTrackBank != null)
        {
            var isFX = currentTrackBank === fxTrackBank;
            for (var i = 0; i < 6; i++)
            {
                var fxTrack = fxTrackBank.getTrack (i);
                var isEmpty = isFX || !fxTrack.exists;
                d.setCell (0, 2 + i, isEmpty ? "" : fxTrack.name, Display.FORMAT_RAW)
                 .setCell (1, 2 + i, isEmpty ? "" : t.sends[i].volumeStr, Display.FORMAT_RAW)
                 .setCell (2, 2 + i, isEmpty ? "" : t.sends[i].volume, isEmpty ? Display.FORMAT_RAW : Display.FORMAT_VALUE);
            }
        }
        else
        {
            for (var i = 0; i < 6; i++)
            {
                d.setCell (0, 2 + i, t.sends[i].name, Display.FORMAT_RAW)
                 .setCell (1, 2 + i, t.sends[i].volumeStr, Display.FORMAT_RAW)
                 .setCell (2, 2 + i, t.sends[i].volume, Display.FORMAT_VALUE);
            }
        }
        
        d.done (0).done (1).done (2);
    }

    this.drawRow4 ();
};
