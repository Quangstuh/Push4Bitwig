// Written by Jürgen Moßgraber - mossgrabers.de
//            Michael Schmalle - teotigraphix.com
// (c) 2014
// Licensed under GPLv3 - http://www.gnu.org/licenses/gpl.html

function CursorDeviceProxy ()
{
	// TODO when parameter page enabled bug is fixed, these will be used
	// for knowing when to show 'Next' and 'Previous' entries
	this.hasNextParameterPage = false;
	this.hasPreviousParamPage = false;

	this.selectedParameterPage = -1;
	this.presetWidth = 16;
	this.fxparams = [ { index: 0, name: '' }, { index: 1, name: '' }, { index: 2, name: '' }, { index: 3, name: '' }, { index: 4, name: '' }, { index: 5, name: '' }, { index: 6, name: '' }, { index: 7, name: '' } ];
	this.selectedDevice =
	{
		name: 'None',
        enabled: false,
		hasPreviousDevice: false,
		hasNextDevice: false
	};
    
	this.cursorDevice = host.createCursorDevice ();

	this.cursorDevice.addIsEnabledObserver (doObject (this, function (isEnabled)
	{
		this.selectedDevice.enabled = isEnabled;
	}));
	this.cursorDevice.addNameObserver (34, 'None', doObject (this, function (name)
	{
		this.selectedDevice.name = name;
	}));

	// TODO (mschmalle) These don't seem to work, when working, the Next, Previous visibilities
	// can be managed correctly, right now just using selectedParameterPage
	this.cursorDevice.addPreviousParameterPageEnabledObserver (doObject (this, function (isEnabled)
	{
		this.hasPreviousParamPage = isEnabled;
	}));
	this.cursorDevice.addNextParameterPageEnabledObserver (doObject (this, function (isEnabled)
	{
		this.hasNextParameterPage = isEnabled;
	}));
	this.cursorDevice.addSelectedPageObserver (-1, doObject (this, function (page)
	{
		this.selectedParameterPage = page;
	}));

	for (var i = 0; i < 8; i++)
	{
		var p = this.getParameter (i);

		// Parameter name
		p.addNameObserver (8, '', doObjectIndex (this, i, function (index, name)
		{
			this.fxparams[index].name = name;
		}));
		p.addValueObserver (128, doObjectIndex (this, i, function (index, value)
		{
			this.fxparams[index].value = value;
		}));
		// Parameter value text
		p.addValueDisplayObserver (8, '',  doObjectIndex (this, i, function (index, value)
		{
			this.fxparams[index].valueStr = value;
		}));
	}

	//----------------------------------
	// Presets
	//----------------------------------

	this.currentPreset = null;

	this.categoryProvider = new PresetProvider (PresetProvider.Kind.CATEGORY);
	this.creatorProvider = new PresetProvider (PresetProvider.Kind.CREATOR);
	//this.presetProvider = new PresetProvider (PresetProvider.Kind.PRESET);

	// - Category
	this.cursorDevice.addPresetCategoriesObserver (doObject (this, function ()
	{
		this.categoryProvider.setItems (arguments);
	}));

	// This allows matching from selection made in DAW (full name)
	this.cursorDevice.addPresetCategoryObserver (100, '', doObject (this, function (name)
	{
		this.categoryProvider.setSelectedItemVerbose (name);
	}));

	// Character display
	this.cursorDevice.addPresetCategoryObserver (this.presetWidth, '', doObject (this, function (name)
	{
		this.categoryProvider.setSelectedItem (name);
	}));

	// - Creator
	this.cursorDevice.addPresetCreatorsObserver (doObject (this, function ()
	{
		this.creatorProvider.setItems(arguments);
	}));

	// This allows matching from selection made in DAW (full name)
	this.cursorDevice.addPresetCreatorObserver (100, '', doObject (this, function (name)
	{
		this.creatorProvider.setSelectedItemVerbose(name);
	}));

	// Character display
	this.cursorDevice.addPresetCreatorObserver (this.presetWidth, '', doObject (this, function (name)
	{
		this.creatorProvider.setSelectedItem(name);
	}));

	// - Preset
	this.cursorDevice.addPresetNameObserver (this.presetWidth, '', doObject (this, function (name)
	{
		this.currentPreset = name;
	}));
}

//--------------------------------------
// Bitwig Device API
//--------------------------------------

CursorDeviceProxy.prototype.getCommonParameter = function (index)
{
	return this.cursorDevice.getCommonParameter (index);
};

CursorDeviceProxy.prototype.getEnvelopeParameter = function (index)
{
	return this.cursorDevice.getEnvelopeParameter (index);
};

CursorDeviceProxy.prototype.getMacro = function (index)
{
	return this.cursorDevice.getMacro (index)
};

CursorDeviceProxy.prototype.getModulationSource = function (index)
{
	return this.cursorDevice.getModulationSource (index)
};

CursorDeviceProxy.prototype.getParameter = function (indexInPage)
{
	return this.cursorDevice.getParameter (indexInPage);
};

CursorDeviceProxy.prototype.nextParameterPage = function ()
{
	return this.cursorDevice.nextParameterPage ();
};

CursorDeviceProxy.prototype.previousParameterPage = function ()
{
	return this.cursorDevice.previousParameterPage ();
};

CursorDeviceProxy.prototype.setParameterPage = function (index)
{
	return this.cursorDevice.setParameterPage (index);
};

CursorDeviceProxy.prototype.setPresetCategory = function (index)
{
	return this.cursorDevice.setPresetCategory (index)
};

CursorDeviceProxy.prototype.setPresetCreator = function (index)
{
	return this.cursorDevice.setPresetCreator (index)
};

CursorDeviceProxy.prototype.switchToNextPreset = function ()
{
	return this.cursorDevice.switchToNextPreset ();
};

CursorDeviceProxy.prototype.switchToNextPresetCategory = function ()
{
	return this.cursorDevice.switchToNextPresetCategory ();
};

CursorDeviceProxy.prototype.switchToNextPresetCreator = function ()
{
	return this.cursorDevice.switchToNextPresetCreator ();
};

CursorDeviceProxy.prototype.switchToPreviousPreset = function ()
{
	return this.cursorDevice.switchToPreviousPreset ();
};

CursorDeviceProxy.prototype.switchToPreviousPresetCategory = function ()
{
	return this.cursorDevice.switchToPreviousPresetCategory ();
};

CursorDeviceProxy.prototype.switchToPreviousPresetCreator = function ()
{
	return this.cursorDevice.switchToPreviousPresetCreator ();
};

CursorDeviceProxy.prototype.toggleEnabledState = function ()
{
	return this.cursorDevice.toggleEnabledState ();
};

//--------------------------------------
// Bitwig CursorDevice API
//--------------------------------------

CursorDeviceProxy.prototype.selectNext = function ()
{
	return this.cursorDevice.selectNext ();
};

CursorDeviceProxy.prototype.selectPrevious = function ()
{
	return this.cursorDevice.selectPrevious ();
};

//--------------------------------------
// Public API
//--------------------------------------

CursorDeviceProxy.prototype.getSelectedDevice = function ()
{
	return this.selectedDevice;
};

CursorDeviceProxy.prototype.getFXParam = function (index)
{
	return this.fxparams[index];
};

CursorDeviceProxy.prototype.hasPreviousParameterPage = function ()
{
	return this.selectedParameterPage > 0;
};

//--------------------------------------
// PresetProvider Class
//--------------------------------------

function PresetProvider (kind)
{
	this.kind = kind;
	this.items = [];
	this.selectedItem = null;
	this.selectedItemVerbose = null;
	this.selectedIndex = -1;
}

PresetProvider.Kind =
{
	CATEGORY: 0,
	CREATOR:  1,
	PRESET:   2
};

// Not used
PresetProvider.prototype.getSelectedIndex = function ()
{
	return this.selectedIndex;
};

// Not used
PresetProvider.prototype.getSelectedItem = function ()
{
	return this.selectedItem;
};

PresetProvider.prototype.setSelectedItem = function (item)
{
	this.selectedItem = item;
};

PresetProvider.prototype.setSelectedItemVerbose = function (selectedItemVerbose)
{
	this.selectedItemVerbose = selectedItemVerbose;
	this.itemsChanged ();
};

PresetProvider.prototype.getView = function (length)
{
	var result = [];
	for (var i = this.selectedIndex; i < this.selectedIndex + length; i++)
		result.push (this.items[i]);
	return result;
};

PresetProvider.prototype.setItems = function (items)
{
	this.items = items;
	this.itemsChanged ();
};

PresetProvider.prototype.itemsChanged = function ()
{
	this.selectedIndex = 0;

	if (this.items == null)
		return;

	var len = this.items.length;
	for (var i = 0; i < len; i++)
	{
		if (this.items[i] == this.selectedItemVerbose)
		{
			this.selectedIndex = i;
			break;
		}
	}
};
