"use client";

import { useId, useMemo, useState } from "react";
import { RotateCcw, Play } from "lucide-react";
import type { Control, RegistryEntry } from "@/registry/schema";
import { demos } from "@/registry/demos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CodeBlock } from "./code-block";
import { defaultValues, fillUsage, type ControlValue } from "./usage";

type Values = Record<string, ControlValue>;

const HEX = /^#[0-9a-fA-F]{6}$/;

function ControlField({
  control,
  value,
  onChange,
}: {
  control: Control;
  value: ControlValue;
  onChange: (prop: string, value: ControlValue) => void;
}) {
  const id = useId();

  switch (control.type) {
    case "number": {
      const current = typeof value === "number" ? value : control.default;
      return (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <Label>{control.label}</Label>
            <output className="font-mono text-xs tabular-nums text-muted-foreground" aria-live="polite">
              {current}
            </output>
          </div>
          <Slider
            aria-label={control.label}
            min={control.min}
            max={control.max}
            step={control.step}
            value={[current]}
            onValueChange={([next]) => onChange(control.prop, next)}
            className="focus-visible:[&_[role=slider]]:ring-brand"
          />
        </div>
      );
    }
    case "select": {
      const current = typeof value === "string" ? value : control.default;
      return (
        <div className="flex flex-col gap-2">
          <Label htmlFor={id}>{control.label}</Label>
          <Select value={current} onValueChange={(next) => onChange(control.prop, next)}>
            <SelectTrigger id={id} className="w-full focus-visible:ring-brand">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {control.options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    }
    case "text": {
      const current = typeof value === "string" ? value : control.default;
      return (
        <div className="flex flex-col gap-2">
          <Label htmlFor={id}>{control.label}</Label>
          <Input
            id={id}
            type="text"
            value={current}
            onChange={(event) => onChange(control.prop, event.target.value)}
            className="focus-visible:ring-brand"
          />
        </div>
      );
    }
    case "boolean": {
      const current = typeof value === "boolean" ? value : control.default;
      return (
        <div className="flex items-center justify-between gap-3">
          <Label htmlFor={id}>{control.label}</Label>
          <Switch
            id={id}
            checked={current}
            onCheckedChange={(next) => onChange(control.prop, next)}
            className="focus-visible:ring-brand"
          />
        </div>
      );
    }
    case "color": {
      const current = typeof value === "string" && HEX.test(value) ? value : control.default;
      const hexId = `${id}-hex`;
      return (
        <div className="flex flex-col gap-2">
          <Label htmlFor={id}>{control.label}</Label>
          <div className="flex items-center gap-2">
            <input
              id={id}
              type="color"
              value={HEX.test(current) ? current : "#000000"}
              onChange={(event) => onChange(control.prop, event.target.value)}
              className="h-9 w-12 cursor-pointer rounded-md border border-border bg-background p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            />
            <Input
              id={hexId}
              aria-label={`${control.label} hex value`}
              value={current}
              onChange={(event) => onChange(control.prop, event.target.value)}
              className="font-mono focus-visible:ring-brand"
              spellCheck={false}
            />
          </div>
        </div>
      );
    }
  }
}

export function Playground({ entry }: { entry: RegistryEntry }) {
  const initial = useMemo(() => defaultValues(entry.controls), [entry.controls]);
  const [values, setValues] = useState<Values>(initial);
  const [replay, setReplay] = useState(0);
  const Demo = demos[entry.id];

  const usage = useMemo(() => fillUsage(entry.usage, values), [entry.usage, values]);

  function handleChange(prop: string, value: ControlValue) {
    setValues((prev) => ({ ...prev, [prop]: value }));
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
        <div className="relative flex min-h-64 min-w-0 flex-1 items-center justify-center overflow-hidden rounded-md border border-border bg-muted/40 p-6">
          {Demo ? (
            <Demo key={replay} {...values} />
          ) : (
            <p className="text-sm text-muted-foreground">No live preview is available for this component.</p>
          )}
        </div>

        <div className="flex w-full flex-col gap-4 md:w-72 md:shrink-0">
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setReplay((n) => n + 1)}
              className="focus-visible:ring-brand"
            >
              <Play aria-hidden="true" className="size-3.5" />
              Replay
            </Button>
            {entry.controls.length > 0 ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setValues(initial)}
                className="focus-visible:ring-brand"
              >
                <RotateCcw aria-hidden="true" className="size-3.5" />
                Reset
              </Button>
            ) : null}
          </div>

          {entry.controls.length > 0 ? (
            <fieldset className="flex flex-col gap-4 rounded-md border border-border p-4">
              <legend className="px-1 text-sm font-medium">Controls</legend>
              {entry.controls.map((control) => (
                <ControlField
                  key={control.prop}
                  control={control}
                  value={values[control.prop]}
                  onChange={handleChange}
                />
              ))}
            </fieldset>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium">Generated usage</h3>
        <CodeBlock code={usage} label="usage.tsx" />
      </div>
    </div>
  );
}
