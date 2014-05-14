// Written by Jürgen Moßgraber - mossgrabers.de
//            Michael Schmalle - teotigraphix.com
// (c) 2014
// Licensed under GPLv3 - http://www.gnu.org/licenses/gpl.html

PanMode.PARAM_NAMES = 'Pan      Pan     Pan      Pan     Pan      Pan     Pan      Pan     ';


function PanMode (model)
{
	BaseMode.call (this, model);
	this.id = MODE_PAN;
}
PanMode.prototype = new BaseMode ();

PanMode.prototype.onValueKnob = function (index, value)
{
	var t = this.model.getTrack (index);
	t.pan = this.changeValue (value, t.pan);
	trackBank.getTrack (t.index).getPan ().set (t.pan, 128);
};

PanMode.prototype.updateDisplay = function ()
{
	var d = push.display;
	
	for (var i = 0; i < 8; i++)
	{
		var t = this.model.getTrack (i);
		d.setCell (1, i, t.panStr, Display.FORMAT_RAW)
		 .setCell (2, i, t.pan, Display.FORMAT_PAN);
	}
	d.setRow (0, PanMode.PARAM_NAMES).done (1).done (2);
};