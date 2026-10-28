import React, { useState } from 'react';
import {
  Search,
  Mail,
  Lock,
  Download,
  Plus,
  Send,
} from 'lucide-react';
import {
  Button,
  Input,
  Card,
  Badge,
  Modal,
  Table,
  Loader,
  StatusBadge,
} from '@/components/common';

export default function ComponentShowcasePage() {
  // Showcase state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState('md');
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [showEmptyTable, setShowEmptyTable] = useState(false);
  const [isOverlayLoaderActive, setIsOverlayLoaderActive] = useState(false);

  // Sample table data for showcase
  const sampleTableData = [
    {
      id: 'REC-001',
      name: 'Aarav Sharma',
      email: 'aarav@university.edu',
      status: 'VERIFIED',
      score: '98%',
      role: 'Applicant',
    },
    {
      id: 'REC-002',
      name: 'Priya Sundaram',
      email: 'priya@university.edu',
      status: 'FLAGGED',
      score: '78%',
      role: 'Reviewee',
    },
    {
      id: 'REC-003',
      name: 'Rohan Deshmukh',
      email: 'rohan@university.edu',
      status: 'VERIFIED',
      score: '94%',
      role: 'Applicant',
    },
    {
      id: 'REC-004',
      name: 'Rahul K. Meena',
      email: 'rahul@university.edu',
      status: 'INVALID',
      score: '36%',
      role: 'Applicant',
    },
    {
      id: 'REC-005',
      name: 'Sunita Joshi',
      email: 'sunita@university.edu',
      status: 'PENDING',
      score: '84%',
      role: 'Applicant',
    },
  ];

  const sampleColumns = [
    {
      key: 'id',
      header: 'ID',
      render: (val) => <span className="font-mono text-xs font-semibold text-indigo-600">{val}</span>,
    },
    {
      key: 'name',
      header: 'Full Name',
      render: (val, row) => (
        <div>
          <span className="font-semibold text-foreground">{val}</span>
          <p className="text-[11px] text-muted-foreground">{row.email}</p>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status Badge',
      render: (val) => <StatusBadge status={val} size="sm" />,
    },
    {
      key: 'score',
      header: 'Confidence',
      render: (val) => <span className="font-mono text-xs font-semibold">{val}</span>,
    },
    {
      key: 'role',
      header: 'User Role',
      render: (val) => <Badge variant="neutral" size="sm">{val}</Badge>,
    },
    {
      key: 'action',
      header: 'Actions',
      align: 'right',
      render: (_, row) => (
        <Button
          variant="outline"
          size="sm"
          className="text-xs h-7 px-2"
          onClick={() => alert(`Clicked ${row.name}`)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-10 pb-16">
      {/* Header Banner */}
      <div className="border-b border-border/70 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="purple" className="text-xs font-mono">
            SynapseForms Design System
          </Badge>
          <Badge variant="success" dot className="text-xs">
            Production Ready
          </Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Reusable UI Component Showcase
        </h1>
        <p className="text-sm text-muted-foreground mt-1.5 max-w-3xl leading-relaxed">
          Comprehensive reference guide and interactive playground for all core design tokens and
          reusable frontend components for the SynapseForms platform.
        </p>
      </div>

      {/* 1. BUTTONS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">1. Button Component</h2>
            <p className="text-xs text-muted-foreground">
              Supports variants (primary, secondary, outline, danger, success, ghost), states, loading, and sizes.
            </p>
          </div>
          <code className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded">
            @/components/common/Button
          </code>
        </div>

        <Card className="p-6 space-y-6">
          {/* Variants */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Variants
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="danger">Danger Button</Button>
              <Button variant="success">Success Button</Button>
              <Button variant="ghost">Ghost Button</Button>
            </div>
          </div>

          {/* States */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              States (Loading & Disabled)
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                loading={isLoadingButton}
                onClick={() => {
                  setIsLoadingButton(true);
                  setTimeout(() => setIsLoadingButton(false), 1500);
                }}
              >
                {isLoadingButton ? 'Processing...' : 'Click to Test Loading'}
              </Button>
              <Button variant="primary" loading>
                Always Loading
              </Button>
              <Button variant="primary" disabled>
                Disabled Primary
              </Button>
              <Button variant="outline" disabled>
                Disabled Outline
              </Button>
              <Button variant="danger" disabled>
                Disabled Danger
              </Button>
            </div>
          </div>

          {/* Sizes & Icons */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Sizes & Icon Support
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
                Small Button
              </Button>
              <Button size="md" icon={<Download className="w-4 h-4" />}>
                Medium (Default)
              </Button>
              <Button size="lg" icon={<Send className="w-4 h-4" />} iconPosition="right">
                Large Button
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* 2. INPUTS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">2. Input Component</h2>
            <p className="text-xs text-muted-foreground">
              Supports text, email, password (with show/hide toggle), labels, helper text, and error states.
            </p>
          </div>
          <code className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded">
            @/components/common/Input
          </code>
        </div>

        <Card className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Input
              label="Standard Text Input"
              placeholder="e.g. John Doe"
              helperText="Full legal name as registered on ledger"
            />

            <Input
              type="email"
              label="Email Address"
              placeholder="e.g. user@synapseforms.org"
              icon={<Mail className="w-4 h-4" />}
              helperText="We will never share your email"
              required
            />

            <Input
              type="password"
              label="Password (Interactive Toggle)"
              placeholder="Enter secure password"
              defaultValue="SuperSecretPass123"
              icon={<Lock className="w-4 h-4" />}
              helperText="Click the eye icon to toggle visibility"
            />

            <Input
              label="Input with Error State"
              defaultValue="invalid-format-roll"
              error="Roll number must match format YYYY-DEPT-XXXX"
              required
            />

            <Input
              label="Disabled State"
              defaultValue="Locked administrative field"
              disabled
              helperText="This field is read-only for current session"
            />

            <Input
              label="Search Input with Leading Icon"
              placeholder="Search records or submissions..."
              icon={<Search className="w-4 h-4" />}
            />
          </div>
        </Card>
      </section>

      {/* 3. CARDS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">3. Card Component</h2>
            <p className="text-xs text-muted-foreground">
              Standard SaaS card with header, subtitle, actions, content, and footer sections.
            </p>
          </div>
          <code className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded">
            @/components/common/Card
          </code>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card
            title="Card with Full Anatomy"
            subtitle="Demonstrating title, subtitle, header action, and custom footer"
            action={
              <Badge variant="purple" size="sm">
                Pro Feature
              </Badge>
            }
            footer={
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Last updated 2 hours ago</span>
                <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
                  Learn more
                </Button>
              </div>
            }
          >
            <p className="text-xs text-muted-foreground leading-relaxed">
              Cards group related content together and provide clear visual hierarchies for dashboards,
              audits, and complex forms without cluttering the screen.
            </p>
          </Card>

          <Card
            title="Interactive Hover Card"
            subtitle="Hover over this card to view subtle elevation and border highlight"
            hover
          >
            <p className="text-xs text-muted-foreground leading-relaxed">
              When <code className="font-mono text-indigo-600 font-semibold">hover={'{true}'}</code> is passed,
              the card gains a smooth shadow transition and refined border treatment ideal for clickable listings.
            </p>
          </Card>
        </div>
      </section>

      {/* 4. BADGES */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">4. Badge Component</h2>
            <p className="text-xs text-muted-foreground">
              Semantic badges: Success, Warning, Danger, Neutral, Info, Purple, and Default.
            </p>
          </div>
          <code className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded">
            @/components/common/Badge
          </code>
        </div>

        <Card className="p-6 space-y-5">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Semantic Color Variants
            </h3>
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="success">Success Badge</Badge>
              <Badge variant="warning">Warning Badge</Badge>
              <Badge variant="danger">Danger Badge</Badge>
              <Badge variant="info">Info Badge</Badge>
              <Badge variant="neutral">Neutral Badge</Badge>
              <Badge variant="purple">Purple / Brand</Badge>
              <Badge variant="default">Default Muted</Badge>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Dot Indicators & Sizes
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="success" size="sm" dot>
                Active
              </Badge>
              <Badge variant="warning" size="sm" dot>
                Pending Review
              </Badge>
              <Badge variant="danger" size="sm" dot>
                Offline
              </Badge>
              <Badge variant="info" size="md" dot>
                Medium Size Badge
              </Badge>
            </div>
          </div>
        </Card>
      </section>

      {/* 5. STATUS BADGES */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">5. StatusBadge Component</h2>
            <p className="text-xs text-muted-foreground">
              Specifically standardized for SynapseForms verification pipeline statuses: VERIFIED, FLAGGED, INVALID, PENDING.
            </p>
          </div>
          <code className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded">
            @/components/common/StatusBadge
          </code>
        </div>

        <Card className="p-6 space-y-5">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Core Verification Statuses
            </h3>
            <div className="flex flex-wrap items-center gap-4">
              <div className="space-y-1">
                <StatusBadge status="VERIFIED" />
                <p className="text-[10px] text-muted-foreground font-mono">Confidence &ge; 90%</p>
              </div>

              <div className="space-y-1">
                <StatusBadge status="FLAGGED" />
                <p className="text-[10px] text-muted-foreground font-mono">Confidence 70-89%</p>
              </div>

              <div className="space-y-1">
                <StatusBadge status="INVALID" />
                <p className="text-[10px] text-muted-foreground font-mono">Confidence &lt; 70%</p>
              </div>

              <div className="space-y-1">
                <StatusBadge status="PENDING" pulse />
                <p className="text-[10px] text-muted-foreground font-mono">Queued in pipeline</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Sizes Comparison
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status="VERIFIED" size="sm" />
              <StatusBadge status="VERIFIED" size="md" />
              <StatusBadge status="VERIFIED" size="lg" />
            </div>
          </div>
        </Card>
      </section>

      {/* 6. MODAL */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">6. Modal Component</h2>
            <p className="text-xs text-muted-foreground">
              Accessible dialog with overlay, open/close behavior, keyboard escape handler, and responsive behavior.
            </p>
          </div>
          <code className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded">
            @/components/common/Modal
          </code>
        </div>

        <Card className="p-6">
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              onClick={() => {
                setModalSize('md');
                setIsModalOpen(true);
              }}
            >
              Open Standard Modal (md)
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setModalSize('lg');
                setIsModalOpen(true);
              }}
            >
              Open Large Modal (lg)
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setModalSize('sm');
                setIsModalOpen(true);
              }}
            >
              Open Compact Modal (sm)
            </Button>
          </div>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            size={modalSize}
            title="Interactive Modal Demonstration"
            description="Notice the smooth backdrop blur, keyboard ESC dismissal, and responsive sheet behavior on mobile devices."
            footer={
              <>
                <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    alert('Confirmed modal action!');
                    setIsModalOpen(false);
                  }}
                >
                  Confirm Action
                </Button>
              </>
            }
          >
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground leading-relaxed">
                This Modal component handles scroll locking on <code className="font-mono text-foreground">document.body</code>,
                accessible ARIA attributes, and fits seamlessly on mobile screens as well as wide desktops.
              </p>
              <Input
                label="Sample Input Inside Modal"
                placeholder="Type here..."
                helperText="Focus trapping and input handling works seamlessly inside modals"
              />
            </div>
          </Modal>
        </Card>
      </section>

      {/* 7. TABLE */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">7. Table Component</h2>
            <p className="text-xs text-muted-foreground">
              Responsive overflow, column definitions, custom renderers, and built-in empty state.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowEmptyTable(!showEmptyTable)}
              className="text-xs h-7.5"
            >
              Toggle Empty State ({showEmptyTable ? 'Showing Empty' : 'Showing Data'})
            </Button>
            <code className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded">
              @/components/common/Table
            </code>
          </div>
        </div>

        <Table
          columns={sampleColumns}
          data={showEmptyTable ? [] : sampleTableData}
          emptyTitle="Demonstration Empty State"
          emptyMessage="This empty state is automatically displayed when the dataset array is empty."
        />
      </section>

      {/* 8. LOADER */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">8. Loader Component</h2>
            <p className="text-xs text-muted-foreground">
              Spinner, loading states with descriptive labels, sizes (xs to xl), and container overlay modes.
            </p>
          </div>
          <code className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded">
            @/components/common/Loader
          </code>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card title="Spinner Sizes & Inline Mode">
            <div className="flex flex-wrap items-center justify-around gap-4 py-4">
              <div className="text-center space-y-1">
                <Loader size="xs" />
                <span className="text-[10px] text-muted-foreground font-mono">xs</span>
              </div>
              <div className="text-center space-y-1">
                <Loader size="sm" />
                <span className="text-[10px] text-muted-foreground font-mono">sm</span>
              </div>
              <div className="text-center space-y-1">
                <Loader size="md" />
                <span className="text-[10px] text-muted-foreground font-mono">md</span>
              </div>
              <div className="text-center space-y-1">
                <Loader size="lg" />
                <span className="text-[10px] text-muted-foreground font-mono">lg</span>
              </div>
              <div className="text-center space-y-1">
                <Loader size="xl" />
                <span className="text-[10px] text-muted-foreground font-mono">xl</span>
              </div>
            </div>
          </Card>

          <Card
            title="Loading State with Labels & Card Overlay"
            className="relative"
            action={
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsOverlayLoaderActive(true);
                  setTimeout(() => setIsOverlayLoaderActive(false), 2000);
                }}
                className="text-xs h-7"
              >
                Test Overlay (2s)
              </Button>
            }
          >
            <div className="py-6 flex flex-col items-center justify-center">
              <Loader
                size="md"
                label="Reconciling with Master Ledger..."
                subtext="Checking cryptographic checksums across 18,450 rows"
              />
            </div>

            {isOverlayLoaderActive && (
              <Loader
                overlay
                size="lg"
                label="Simulating Container Overlay"
                subtext="Backdrop blur applied over card content"
              />
            )}
          </Card>
        </div>
      </section>
    </div>
  );
}
