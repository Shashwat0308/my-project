import React from 'react';
import { motion } from 'framer-motion';
import { Type, Palette, Layout, GripHorizontal, Heading } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

const CustomizationPanel = ({ settings, onUpdate, templates, selectedTemplateId, onSelectTemplate }) => {
  const fonts = ['Inter', 'Poppins', 'Roboto', 'Montserrat'];
  const colors = [
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Green', value: '#10b981' },
    { name: 'Rose', value: '#f43f5e' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Slate', value: '#64748b' },
  ];

  return (
    <div className="h-full flex flex-col bg-slate-900/50 backdrop-blur-xl border-r border-white/10">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Palette className="w-5 h-5 text-purple-400" />
          Customization
        </h2>
      </div>

      <Tabs defaultValue="templates" className="flex-1 overflow-hidden flex flex-col">
        <div className="px-6 pt-4">
          <TabsList className="w-full bg-white/5 border border-white/10 grid grid-cols-3">
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
          {/* TEMPLATES TAB */}
          <TabsContent value="templates" className="mt-0 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {templates.map((template) => (
                <motion.button
                  key={template.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectTemplate(template)}
                  className={`relative aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all text-left group ${
                    selectedTemplateId === template.id
                      ? 'border-purple-500 ring-2 ring-purple-500/20'
                      : 'border-transparent hover:border-white/20'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${template.gradient} opacity-50`} />
                  <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/60 backdrop-blur-sm">
                    <span className="text-xs font-semibold text-white block">{template.name}</span>
                  </div>
                  {selectedTemplateId === template.id && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </TabsContent>

          {/* STYLE TAB */}
          <TabsContent value="style" className="mt-0 space-y-8">
            {/* Colors */}
            <div className="space-y-4">
              <Label className="text-white flex items-center gap-2">
                <Palette className="w-4 h-4" /> Primary Color
              </Label>
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => onUpdate('color', color.value)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      settings.color === color.value
                        ? 'border-white scale-110'
                        : 'border-transparent hover:scale-110'
                    }`}
                    style={{ backgroundColor: color.value }}
                  />
                ))}
                <input
                  type="color"
                  value={settings.color}
                  onChange={(e) => onUpdate('color', e.target.value)}
                  className="w-8 h-8 rounded-full overflow-hidden cursor-pointer border-0 p-0"
                />
              </div>
            </div>

            {/* Typography */}
            <div className="space-y-4">
              <Label className="text-white flex items-center gap-2">
                <Type className="w-4 h-4" /> Font Family
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {fonts.map((font) => (
                  <Button
                    key={font}
                    variant={settings.font === font ? 'default' : 'outline'}
                    onClick={() => onUpdate('font', font)}
                    className={`justify-start ${
                      settings.font === font
                        ? 'bg-purple-600 hover:bg-purple-700'
                        : 'border-white/10 hover:bg-white/5 text-gray-300'
                    }`}
                    style={{ fontFamily: font }}
                  >
                    {font}
                  </Button>
                ))}
              </div>
            </div>

            {/* Font Size */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label className="text-white">Base Font Size</Label>
                <span className="text-xs text-gray-400">{settings.fontSize}px</span>
              </div>
              <Slider
                value={[settings.fontSize]}
                min={12}
                max={18}
                step={1}
                onValueChange={([val]) => onUpdate('fontSize', val)}
                className="py-4"
              />
            </div>
          </TabsContent>

          {/* LAYOUT TAB */}
          <TabsContent value="layout" className="mt-0 space-y-8">
            {/* Layout Mode */}
            <div className="space-y-4">
              <Label className="text-white flex items-center gap-2">
                <Layout className="w-4 h-4" /> Structure
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => onUpdate('columns', 1)}
                  className={`p-4 rounded-lg border-2 text-center transition-all ${
                    settings.columns === 1
                      ? 'border-purple-500 bg-purple-500/10 text-white'
                      : 'border-white/10 text-gray-400 hover:border-white/30'
                  }`}
                >
                  <div className="w-full h-12 bg-current opacity-20 rounded mb-2 mx-auto" />
                  <span className="text-xs font-medium">Single Column</span>
                </button>
                <button
                  onClick={() => onUpdate('columns', 2)}
                  className={`p-4 rounded-lg border-2 text-center transition-all ${
                    settings.columns === 2
                      ? 'border-purple-500 bg-purple-500/10 text-white'
                      : 'border-white/10 text-gray-400 hover:border-white/30'
                  }`}
                >
                  <div className="flex gap-2 h-12 justify-center mb-2">
                    <div className="w-1/3 bg-current opacity-20 rounded" />
                    <div className="w-2/3 bg-current opacity-20 rounded" />
                  </div>
                  <span className="text-xs font-medium">Two Columns</span>
                </button>
              </div>
            </div>

            {/* Spacing */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label className="text-white flex items-center gap-2">
                  <GripHorizontal className="w-4 h-4" /> Spacing
                </Label>
                <span className="text-xs text-gray-400">{settings.spacing}</span>
              </div>
              <Slider
                value={[settings.spacing === 'compact' ? 1 : settings.spacing === 'normal' ? 2 : 3]}
                min={1}
                max={3}
                step={1}
                onValueChange={([val]) => {
                  const map = { 1: 'compact', 2: 'normal', 3: 'spacious' };
                  onUpdate('spacing', map[val]);
                }}
              />
            </div>

            {/* Section Styling */}
            <div className="flex items-center justify-between">
              <Label className="text-white">Uppercased Headers</Label>
              <Switch
                checked={settings.uppercaseHeaders}
                onCheckedChange={(checked) => onUpdate('uppercaseHeaders', checked)}
              />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default CustomizationPanel;