
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Item, ItemMeasurements, ItemDetails } from '@/types';
import { generateItemDescription } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ItemFormProps {
  item: Item;
  onSave: (updatedItem: Item) => void;
}

export function ItemForm({ item, onSave }: ItemFormProps) {
  const [formData, setFormData] = useState<Item>({
    ...item,
    measurements: item.measurements || {},
    details: item.details || {},
  });
  const [generatedDescription, setGeneratedDescription] = useState<string>(
    item.description || ''
  );
  
  // Update measurements
  const updateMeasurements = (field: keyof ItemMeasurements, value: string) => {
    const numValue = value === '' ? undefined : parseFloat(value);
    setFormData({
      ...formData,
      measurements: {
        ...formData.measurements,
        [field]: numValue,
      },
    });
  };
  
  // Update details
  const updateDetails = (field: keyof ItemDetails, value: string | number) => {
    setFormData({
      ...formData,
      details: {
        ...formData.details,
        [field]: value,
      },
    });
  };
  
  // Update specs (nested in details)
  const updateSpec = (key: string, value: string) => {
    setFormData({
      ...formData,
      details: {
        ...formData.details,
        specs: {
          ...(formData.details?.specs || {}),
          [key]: value,
        },
      },
    });
  };
  
  // Add new empty spec field
  const addSpecField = () => {
    const newKey = `spec${Object.keys(formData.details?.specs || {}).length + 1}`;
    updateSpec(newKey, '');
  };

  // Generate description based on current form data
  const handleGenerateDescription = () => {
    const description = generateItemDescription(formData);
    setGeneratedDescription(description);
    setFormData({
      ...formData,
      description,
    });
  };

  // Save the form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  // Update basic field
  const updateField = (field: keyof Item, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-medium">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Item Name</Label>
            <Input
              id="name"
              value={formData.name || ''}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="Enter item name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={formData.category || ''}
              onChange={(e) => updateField('category', e.target.value)}
              placeholder="Enter item category"
            />
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-medium">Measurements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="height">Height (inches)</Label>
            <Input
              id="height"
              type="number"
              step="0.1"
              value={formData.measurements?.height || ''}
              onChange={(e) => updateMeasurements('height', e.target.value)}
              placeholder="Enter height"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="width">Width (inches)</Label>
            <Input
              id="width"
              type="number"
              step="0.1"
              value={formData.measurements?.width || ''}
              onChange={(e) => updateMeasurements('width', e.target.value)}
              placeholder="Enter width"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="depth">Depth (inches)</Label>
            <Input
              id="depth"
              type="number"
              step="0.1"
              value={formData.measurements?.depth || ''}
              onChange={(e) => updateMeasurements('depth', e.target.value)}
              placeholder="Enter depth"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (lbs)</Label>
            <Input
              id="weight"
              type="number"
              step="0.1"
              value={formData.measurements?.weight || ''}
              onChange={(e) => updateMeasurements('weight', e.target.value)}
              placeholder="Enter weight"
            />
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-medium">Item Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="make">Make</Label>
            <Input
              id="make"
              value={formData.details?.make || ''}
              onChange={(e) => updateDetails('make', e.target.value)}
              placeholder="Enter make"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              value={formData.details?.model || ''}
              onChange={(e) => updateDetails('model', e.target.value)}
              placeholder="Enter model"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              type="number"
              value={formData.details?.year || ''}
              onChange={(e) => updateDetails('year', parseInt(e.target.value) || undefined)}
              placeholder="Enter year"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="serialNumber">Serial Number</Label>
            <Input
              id="serialNumber"
              value={formData.details?.serialNumber || ''}
              onChange={(e) => updateDetails('serialNumber', e.target.value)}
              placeholder="Enter serial number"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="condition">Condition</Label>
            <Input
              id="condition"
              value={formData.details?.condition || ''}
              onChange={(e) => updateDetails('condition', e.target.value)}
              placeholder="Enter condition"
            />
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Specifications</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addSpecField}
          >
            Add Spec
          </Button>
        </div>
        <div className="space-y-4">
          {Object.entries(formData.details?.specs || {}).map(([key, value], index) => (
            <div key={index} className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`spec-key-${index}`}>Spec Name</Label>
                <Input
                  id={`spec-key-${index}`}
                  value={key}
                  onChange={(e) => {
                    const oldSpecs = formData.details?.specs || {};
                    const newSpecs = Object.entries(oldSpecs).reduce((acc, [k, v]) => {
                      if (k === key) {
                        acc[e.target.value] = v;
                      } else {
                        acc[k] = v;
                      }
                      return acc;
                    }, {} as Record<string, string>);
                    
                    setFormData({
                      ...formData,
                      details: {
                        ...formData.details,
                        specs: newSpecs,
                      },
                    });
                  }}
                  placeholder="Spec name"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor={`spec-value-${index}`}>Value</Label>
                <Input
                  id={`spec-value-${index}`}
                  value={value}
                  onChange={(e) => updateSpec(key, e.target.value)}
                  placeholder="Spec value"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Description</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleGenerateDescription}
          >
            Generate Description
          </Button>
        </div>
        <Textarea
          value={formData.description || ''}
          onChange={(e) => updateField('description', e.target.value)}
          placeholder="Enter or generate item description"
          rows={8}
        />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-medium">Additional Notes</h3>
        <Textarea
          value={formData.notes || ''}
          onChange={(e) => updateField('notes', e.target.value)}
          placeholder="Enter any additional notes"
          rows={4}
        />
      </motion.div>

      <div className="flex justify-end">
        <Button type="submit">Save Item</Button>
      </div>
    </form>
  );
}
